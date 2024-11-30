import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    UserModule,

    ConfigModule.forRoot({
      envFilePath: '.env', // Specifies the path to the `.env` file for environment variables.
      isGlobal: true, // Makes the environment variables globally available across the app.
    }),
    MongooseModule.forRoot(process.env.DB_URL), // Connects to MongoDB using the connection string specified in the DB_URL environment variable.
  ],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
