// src/api/auth/jwt.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard extends Passport's AuthGuard to protect routes requiring JWT authentication
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} // Uses JWT strategy for authentication
