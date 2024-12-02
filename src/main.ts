/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable CORS
  app.enableCors({
    origin : 'http://127.0.0.1:3000',// front end origin during development
    methods : 'GET, PUT, POST, DELETE',
    credentials : true, // allow cookies and credentilas

  })

  //Create Swagger configuration using `DocumentBuilder`
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User API CURD Operations')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  //Generate the Swagger document
  // `createDocument` creates the Swagger document based on the configuration and app modules
  const document = () => SwaggerModule.createDocument(app, config);

  // Swagger module
  // `setup` configures Swagger UI for the API, making it accessible at the specified path ('/api' here)
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
