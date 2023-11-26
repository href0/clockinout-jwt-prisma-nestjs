import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt/jwt.config';
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/config/jwt/jwt.strategy';
@Module({
  imports : [PrismaModule, PassportModule, JwtModule.register({
    // global : true,
    // secret : jwtConfig.accessTokenSecret,
    // signOptions : { expiresIn : jwtConfig.expired }
  }),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports : [AuthModule]
})
export class AuthModule {}
