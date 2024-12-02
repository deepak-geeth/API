// src/api/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';
import { MailerModule } from './mailer.module';
import { UserSchema, PasswordResetSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'PasswordReset', schema: PasswordResetSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // Use the JWT_SECRET_KEY from .env
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
