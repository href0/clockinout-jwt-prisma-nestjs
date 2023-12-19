import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core'
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, AttendanceModule],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService, 
    { provide: APP_INTERCEPTOR, useClass : LoggingInterceptor },
    { provide : APP_GUARD, useClass : AuthGuard }
  ],
})
export class AppModule {}
