// src/api/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

// JWT Strategy to validate JWT token and extract user data
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      secretOrKey: 'yourSecretKey', // The secret key to verify the JWT
    });
  }

  // Validate the token's payload and fetch user information
  async validate(payload: { sub: string }) {
    // Find the user by ID (from JWT payload)
    return this.authService.validateUser(payload.sub);
  }
}

