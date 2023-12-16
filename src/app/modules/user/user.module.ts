import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { AttendaceModule } from '../attendace/attendace.module';
import { AttendaceService } from '../attendace/attendace.service';

@Module({
  imports : [PrismaModule, AttendaceModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, AuthService, AttendaceService],
})
export class UserModule {}
