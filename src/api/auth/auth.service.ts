//src/api/auth/auth.service.ts
import { Injectable, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { MailerService } from './mailer.service';
import { PasswordReset } from './schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(PasswordReset.name) private readonly passwordResetModel: Model<PasswordReset>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // Register a new user by email and password
  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  // Login a user and generate a JWT token
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  // Validate the JWT token and return user information
  async validateUser(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  // Generate a reset token and send a password reset email
  async generateResetToken(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('User not found');

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await this.passwordResetModel.create({ email, token, expiresAt });

    const resetLink = `http://localhost:5000/password-reset/reset?token=${token}`;
    await this.mailerService.sendMail(
      email, 
      'Password Reset Request', 
      `Click the link to reset your password: ${resetLink}`,
      `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    );
  }

  // Reset the password using the provided token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetRequest = await this.passwordResetModel.findOne({ token });
    if (!resetRequest || resetRequest.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.updateOne({ email: resetRequest.email }, { password: hashedPassword });
    await this.passwordResetModel.deleteOne({ token });
    this.logger.log(`Password successfully reset for ${resetRequest.email}`);
  }
}











