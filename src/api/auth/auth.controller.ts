// src/api/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, ResetPasswordDto } from './auth.dto'; 
import { JwtAuthGuard } from './jwt.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthDto })
  async register(@Body() authDto: AuthDto) {
    try {
      const user = await this.authService.register(authDto.email, authDto.password);
      return { message: 'User successfully registered', user };
    } catch (error) {
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: AuthDto })
  async login(@Body() authDto: AuthDto) {
    try {
      const { token } = await this.authService.login(authDto.email, authDto.password);
      return { message: 'Login successful', token };
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate a JWT token' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async validate(@Request() req) {
    return req.user;
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password reset email' })
  @ApiBody({ type: AuthDto })
  async forgotPassword(@Body() authDto: AuthDto) {
    try {
      await this.authService.generateResetToken(authDto.email);
      return { message: 'Password reset email sent' };
    } catch (error) {
      throw new BadRequestException('Failed to send reset email');
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      await this.authService.resetPassword(
        resetPasswordDto.token,
        resetPasswordDto.newPassword,
      );
      return { message: 'Password successfully reset' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }
}



