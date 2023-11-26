import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports : [PrismaModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
