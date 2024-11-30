
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create NestJS app from the AppModule

  // Enable Cross-Origin Resource Sharing (CORS) for frontend communication
  app.enableCors({
    origin: 'http://localhost:8100', // Allow only this origin for development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Set up Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('API documentation for authentication and password reset services')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Serve Swagger UI at /api route

  await app.listen(3000); // Start the server on port 3000
}
bootstrap();
