/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserRole = 'admin' | 'user' | 'guest';

@Schema()
export class User {
    
    @Prop({ required: true }) // Defines a required field in the schema for the user's first name
    firstName: string;

    @Prop({ required: true }) // Defines a required field in the schema for the user's last name
    lastName: string;

    @Prop({ required: true, unique: true }) // Defines a required and unique field for the user's email
    email: string;

    @Prop({ required: true }) // Defines a required field for the user's date of birth
    dob: string;
 
    @Prop({ required: true }) // Defines a required field for the user's gender
    gender: string;

    @Prop() // Optional field for the user's role, constrained to the `UserRole` type
    role : UserRole;

    @Prop({ required: true }) // Defines a required field for the user's education
    education: string;

    @Prop({ required: true }) // Defines a required field for the user's company
    company: string;

    @Prop({ required: true }) // Defines a required field for the user's years of experience
    experience: number;

    @Prop({ required: true }) // Defines a required field for the user's package (e.g., salary package)
    package: string;

    @Prop({ required: true, default: 'free' }) // Defines a required field for the subscription type with a default value of 'free'
    subscription: string;

    @Prop({ required: true, default: 0 }) // Defines a required field for the price with a default value of 0
    price: number;
    subscriptions: any;
 
}

export const UserSchema = SchemaFactory.createForClass(User);
