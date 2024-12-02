import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiController } from './api/api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the config accessible throughout the app
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), // Use the MONGO_URI from .env
    AuthModule,],
  controllers: [AppController, ApiController],
  providers: [AppService],
})
export class AppModule {}
