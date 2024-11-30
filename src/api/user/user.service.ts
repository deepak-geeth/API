/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';



@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

     /**
    * Create a new user and calculate the subscription price.
    * @param createUserDto Data for creating the user.
    * @returns {Promise<User>} The newly created user document.
    */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try{
            const { subscription } = createUserDto;

            const price   = this.calculateSubscriptionPrice(subscription);
            const newUser = new this.userModel({ ...createUserDto, price });
        return newUser.save();
    }catch (error) {
        // Add error handling logic for database issues, validation errors, etc.
        throw new Error(`Failed to create user: ${error.message}`);
    }
    }

    /**
   * Retrieve all users from the database.
   * @returns {Promise<User[]>} An array of user documents.
   */
    //TODO : Implement Handle pagination AndsearchFilter
    async findAll(): Promise<User[]>{
        const users=await this.userModel.find();
            return users  
    }

    /**
   * Retrieve a specific user by their ID.
   * @param id The ID of the user to retrieve.
   * @returns {Promise<User>} The user document.
   * @throws {NotFoundException} If the user with the given ID is not found.
   */
    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    /**
   * Update an existing user by ID.
   * @param id The ID of the user to update.
   * @param updateUserDto Data for updating the user.
   * @returns {Promise<User>} The updated user document.
   * @throws {NotFoundException} If the user with the given ID is not found.
   */
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (updateUserDto.subscription) {
            updateUserDto.price = this.calculateSubscriptionPrice(updateUserDto.subscription);
        }

        Object.assign(user, updateUserDto);
        return user.save();
    }

    /**
   * Delete a user by ID.
   * @param id The ID of the user to delete.
   * @returns {Promise<void>} Resolves if deletion is successful.
   * @throws {NotFoundException} If the user with the given ID is not found.
   */
    async deleteUser(id: string): Promise<void> {
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    /**
   *  Foe Example Calculate the subscription price based on the subscription type.
   * @param subscription The subscription type (e.g., "silver", "gold", "brown").
   * @returns {number} The calculated price for the subscription.
   */


    //TODO : Better TO enhance the returned code
    private calculateSubscriptionPrice(subscription: string): number {
        switch (subscription) {
            case 'silver': 
                return 5000;
            case 'gold': 
                return 10000;
            case 'brown': 
                return 20000;
            default: 
                return 0;  // Free subscription
        }
    }

}
