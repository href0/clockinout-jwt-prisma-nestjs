import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:4200' },
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Href Corp')
    .setDescription('Auth, CRUD User, Clock In & Clock Out')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'accessToken',
    )
    .setVersion('1.0')
    // .addTag('First Nest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
