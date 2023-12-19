import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AttendanceModule } from '../attendance/attendance.module';
import { AttendanceService } from '../attendance/attendance.service';

@Module({
  imports : [PrismaModule, AttendanceModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, AuthService, AttendanceService],
})
export class UserModule {}
