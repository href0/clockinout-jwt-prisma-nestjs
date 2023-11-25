import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ProductModule } from './product/product.module';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, { provide: APP_INTERCEPTOR, useClass : LoggingInterceptor }],
})
export class AppModule {}
