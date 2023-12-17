import { Controller, Post, Body, ValidationPipe, UsePipes, Res, Delete, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/signup-auth';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Response, Request } from 'express'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators/public.decorator';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
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
    res.cookie('refreshToken', refreshToken, { 
      maxAge : 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      httpOnly : true
     })
    return res.status(200).json({
      statusCode : 200,
      data : data
    })
  }

  @Public()
  @Delete('signout')
  async signout(
    @Res() res : Response,
    @Req() req : Request
  ) {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    await this.authService.signout(refreshToken)
    res.clearCookie('refreshToken')

    return res.status(200).json({
      statusCode : 200,
      message : "Berhasil logout"
    })
  }

}
