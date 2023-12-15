import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../../config/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService, 
    { provide: APP_INTERCEPTOR, useClass : LoggingInterceptor },
    { provide : APP_GUARD, useClass : AuthGuard }
  ],
})
export class AppModule {}
