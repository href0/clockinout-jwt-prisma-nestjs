import { HttpException, HttpStatus, Injectable, ExecutionContext } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtExpired, jwtConfig } from 'src/config/jwt/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private prisma : PrismaService,
    private jwtService : JwtService,
  ){}
  
  async signUp(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({ where : { email : createUserDto.email} })
    if(user) throw new HttpException(`${createUserDto.email} already exists`, HttpStatus.CONFLICT)
    createUserDto.createdAt = new Date().getTime() / 1000
    createUserDto.updatedAt = new Date().getTime() / 1000
    const saltOrRounds = 10;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, salt);
    createUserDto.password = hash
    const create = await this.prisma.user.create({
      data : createUserDto,
      select : { id : true, email : true, name : true, role : true, createdAt : true }
    })
    return {
      statusCode : 201,
      data : create
    }
  }

  async signIn(signInAuthDto: SignInAuthDto) {
    const user = await this.prisma.user.findUnique({ 
      where : { email : signInAuthDto.email},
    })
    if(!user) throw new HttpException('email or password wrong!', HttpStatus.BAD_REQUEST)

    const password = user.password
    const compare = await bcrypt.compare(signInAuthDto.password, password)
    if(!compare)throw new HttpException('email or password wrong!', HttpStatus.BAD_REQUEST)

    const tokenPayload = {
      sub   : user.id,
      name  : user.name,
      email : user.email,
      role  : user.role
    }

    const refreshToken = this.generateToken(tokenPayload, JwtExpired.REFRESH)
    const update = await this.prisma.user.update({
      where : { email : signInAuthDto.email },
      data : { refresh_token : refreshToken },
      select : { id : true, email : true, name : true, role : true, createdAt : true, updatedAt : true }
    })
    const access_token = this.generateToken(tokenPayload, JwtExpired.ACCESS)
    return {
      refreshToken,
      data : {...update, access_token}
    }
  }

  async signout(){}

  generateToken(payload : any, expired : JwtExpired) {
    const secret = expired == '1h' ? jwtConfig.accessTokenSecret : jwtConfig.refreshTokenSecret
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expired,
    })
  }
}
