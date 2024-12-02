/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
/**
 * DTO (Data Transfer Object) for creating a new user.
 * This class is used to validate and document the structure of incoming data when creating a user.
 */
export class CreateUserDto {

    @ApiProperty({ description: 'First name of the user' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Last name of the user' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Email address of the user' })
    @IsString()
    email: string;

    @ApiProperty({ description: 'Date of birth in YYYY-MM-DD format' })
    @IsString()
    dob: string;
    
    @ApiProperty({ description: 'Gender of the user', example: 'Male/Female/Other' })
    @IsString()
    gender: string;

    @ApiProperty({ description: 'User Role',"example":'Admin/user/guest' })
    @IsString()
    role: string;
    
    @ApiProperty({ description: 'Educational background of the user' })
    @IsString()
    education: string;

    @ApiProperty({ description: 'Company where the user is employed' })
    @IsString()
    company: string;

    @ApiProperty({ description: 'Years of experience the user has', example: 0 })
    @IsNumber()
    experience: number;

    @ApiProperty({ description: 'Current salary package of the user', example: '10 LPA' })
    @IsString()
    package: string;

    @ApiProperty({ description: 'Subscription type', example: 'Basic/silver/gold/brown' })
    @IsString()
    subscription: string;
  }
  
/**
 * DTO for updating an existing user.
 * Similar to `CreateUserDto` but allows optional fields.
 */
export class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
    gender?: string;
    role:string;
    education?: string;
    company?: string;
    experience?: number;
    package?: string;
    subscription?: string;
    price?: number;
}

  /* eslint-disable prettier/prettier */
  /**
 * Interface defining the complete structure of a User.
 * Used for type-checking and ensuring consistent data representation across the application.
 */ 
export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    role : string;
    education: string;
    company: string;
    experience: number;
    package: string;
    subscription: string;
    price: number;
}
  