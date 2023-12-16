import { Controller, Post, Body, Req, HttpException, HttpStatus, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AttendaceService } from './attendace.service';
import { ClockInAttendanceDto } from './dto/clockin-attendance.dto';
import { Request } from 'express';
import { clockOutAttendanceDto } from './dto/clockout-attendace.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Attendace')
@Controller('attendace')
export class AttendaceController {
  constructor(private readonly attendaceService: AttendaceService) {}

  @Post('clockin')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth('accessToken')
  @HttpCode(200)
  async clockIn(
    @Body() data: ClockInAttendanceDto,
    @Req() req : Request
  ) {
    // Ref = https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
    data.clockInIpAddress = 
      req.headers['cf-connecting-ip'] || // cloudfare
      req.headers['x-real-ip'] || // Nginx
      req.headers['x-forwarded-for'] || 
      req.socket.remoteAddress ||
      ""
    data.userId = req.user['id']

    const isClockInAvailable = this.attendaceService.isClockInAvailable()
    if(!isClockInAvailable) throw new HttpException(`Clock In is open from ${process.env.CLOCK_IN_MIN_TIME} until ${process.env.CLOCK_IN_MAX_TIME}`, HttpStatus.BAD_REQUEST)

    const hasClockedIn = await this.attendaceService.hasUserClockedIn(data.userId);
    if(hasClockedIn) throw new HttpException(`User has already clocked in`, HttpStatus.CONFLICT)

    return this.attendaceService.clockIn(data);
  }

  @Post('clockout')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth('accessToken')
  @HttpCode(200)
  async clockOut(
    @Body() data: clockOutAttendanceDto,
    @Req() req : Request
  ) {
    // Ref = https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
    data.clockOutIpAddress = 
      req.headers['cf-connecting-ip'] || // cloudfare
      req.headers['x-real-ip'] || // Nginx
      req.headers['x-forwarded-for'] || 
      req.socket.remoteAddress ||
      ""
    data.userId = req.user['id']
    const hasClockedIn = await this.attendaceService.hasUserClockedOut(data.userId);
    
    if(hasClockedIn) throw new HttpException(`User has already clocked out`, HttpStatus.CONFLICT)

    return this.attendaceService.clockOut(data);
  }

}
