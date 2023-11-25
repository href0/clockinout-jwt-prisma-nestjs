import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { LoggerMiddleware } from '../../core/middlewares/logger/logger.middleware';
import { UserModule } from './user/user.module';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from 'src/core/interceptors/logging/logging.interceptor';

@Module({
  
  imports: [UserModule, PrismaModule, ProductModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: APP_INTERCEPTOR, useClass : LoggingInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user');
  }
}
