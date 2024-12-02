/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.schema';
import { ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('user-db')  // Group all routes under this tag in Swagger UI


@Controller('user-db')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post() // @put() function used to create a user
    @ApiOperation({ summary: 'Create a new user' })  // Summary for the Swagger UI
    @ApiResponse({
        status     : 201,
        description: 'User created successfully.',
    })
    @ApiResponse({
        status     : 400,
        description: 'Bad request.',
    })
    // Define for creating a new user
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get() //@get function is used to get the user
    @ApiOperation({ summary: 'Fetch all users' })
    @ApiQuery({
        name       : 'query',
        description: 'Query parameters for filtering users',
        required   : false,
    })
    @ApiResponse({
        status     : 200,
        description: 'List of all users.',
        type       : [User],
    })
    //TODO: Add more additional functionality for filter and sorting the data
    //get the All users Data
    async getAllUsers():Promise<User[]>{
        return this.userService.findAll()
    }

    @Get(':id')  // Define to fetch a single user by their ID
    @ApiOperation({ summary: 'Fetch a user by ID' })
    @ApiParam({
        name       : 'id',
        description: 'The ID of the user to fetch',
    })
    @ApiResponse({
        status     : 200,
        description: 'User data.',
        type       : User,
    })
    @ApiResponse({
        status     : 404,
        description: 'User not found.',
     })
     //fetch a single user data based on user Id
    async getUserById(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')  // Define to update a user by their ID
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({
        name       : 'id',
        description: 'The ID of the user to update',
    })
    @ApiResponse({
        status     : 200,
        description: 'User updated successfully.',
    })
    @ApiResponse({
        status     : 404,
        description: 'User not found.',
    })
    // update function is update a user data by their Id
    async updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')  // Define to delete a user by their ID
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({
        name       : 'id',
        description: 'The ID of the user to delete',
    })
    @ApiResponse({
        status     : 200,
        description: 'User deleted successfully.',
    })
    @ApiResponse({
        status     : 404,
        description: 'User not found.',
    })

    // delets function is delete a user data by their Id
    async deleteUserById(@Param('id') id: string) {
        await this.userService.deleteUser(id);
        return { message: `User with ID ${id} deleted successfully` };
    }

}
