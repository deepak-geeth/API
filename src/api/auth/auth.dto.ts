// src/api/auth/auth.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO for user authentication (register/login)
export class AuthDto {
  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail({}, { message: 'Invalid email address' }) // Email format validation
  email: string;

  @ApiProperty({ description: 'Password of the user', minLength: 6 })
  @IsNotEmpty({ message: 'Password is required' }) // Ensure password is provided
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Ensure password length
  password: string;
}

// DTO for password reset
export class ResetPasswordDto {
  @ApiProperty({ description: 'Password reset token' })
  @IsNotEmpty({ message: 'Token is required' }) // Ensure token is provided
  token: string;

  @ApiProperty({ description: 'New password', minLength: 6 })
  @IsNotEmpty({ message: 'New password is required' }) // Ensure new password is provided
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) // Ensure minimum password length
  newPassword: string;
}



