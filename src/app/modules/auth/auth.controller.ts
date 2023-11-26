import { Controller, Post, Body, ValidationPipe, UsePipes, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/signup-auth';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Public } from '../../../core/decorators/public.decorator';
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @UsePipes(ValidationPipe)
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Public()
  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body() signInAuthDto: SignInAuthDto,
    @Res() res : Response
  ) {
    const { data, refreshToken } = await this.authService.signIn(signInAuthDto)
    res.cookie('refreshToken', refreshToken)
    return res.status(200).json({
      statusCode : 200,
      data : data
    })
  }
}
