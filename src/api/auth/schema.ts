//src/api/auth/schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Mongoose schema for user data
@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true }) // Email should be unique
  email: string;

  @Prop({ required: true }) // Password field
  password: string;
}

// Mongoose schema for storing password reset requests
@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class PasswordReset extends Document {
  @Prop({ required: true }) // Email associated with the reset request
  email: string;

  @Prop({ required: true }) // Unique reset token
  token: string;

  @Prop({ required: true }) // Expiration date for the reset token
  expiresAt: Date;
}

// Create Mongoose schemas for User and PasswordReset
export const UserSchema = SchemaFactory.createForClass(User);
export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
