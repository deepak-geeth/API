/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';

const UserSchemaDef = { name: User.name, schema: UserSchema };


@Module({

  imports : [MongooseModule.forFeature([UserSchemaDef])],

  controllers: [UserController],

  providers: [UserService]
})
export class UserModule {}
