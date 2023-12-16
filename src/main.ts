import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    new ExpressAdapter(express()),
    { cors: { origin: 'http://localhost:4200' }, 
  });

  app.use(cookieParser());
  app.getHttpAdapter().getInstance().set('trust proxy', true); 

  const config = new DocumentBuilder()
    .setTitle('Href Corp')
    .setDescription('Auth, CRUD User, Clock In & Clock Out')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'accessToken',
    )
    .setVersion('1.0')
    // .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
