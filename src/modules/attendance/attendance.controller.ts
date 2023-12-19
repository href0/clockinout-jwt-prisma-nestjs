import { Controller, Post, Body, Req, HttpException, HttpStatus, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { ClockInAttendanceDto } from './dto/clockin-attendance.dto';
import { Request } from 'express';
import { clockOutAttendanceDto } from './dto/clockout-attendance.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('clockin')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth('accessToken')
  @HttpCode(200)
  async clockIn(@Body() data: ClockInAttendanceDto, @Req() req : Request) {
    // Ref = https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
    data.clockInIpAddress = 
      req.headers['cf-connecting-ip'] || // cloudflare
      req.headers['x-real-ip'] || // Nginx
      req.headers['x-forwarded-for'] || 
      req.socket.remoteAddress ||
      ""
    data.userId = req.user['id']

    const isClockInAvailable = this.attendanceService.isClockInAvailable()
    if(!isClockInAvailable) throw new HttpException(`Clock In is open from ${process.env.CLOCK_IN_MIN_TIME} until ${process.env.CLOCK_IN_MAX_TIME}`, HttpStatus.BAD_REQUEST)

    const hasClockedIn = await this.attendanceService.hasUserClockedIn(data.userId);
    if(hasClockedIn) throw new HttpException(`User has already clocked in`, HttpStatus.CONFLICT)

    return this.attendanceService.clockIn(data);
  }

  @Post('clockout')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth('accessToken')
  @HttpCode(200)
  async clockOut(@Body() data: clockOutAttendanceDto, @Req() req : Request) {
    // Ref = https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
    data.clockOutIpAddress = 
      req.headers['cf-connecting-ip'] || // cloudflare
      req.headers['x-real-ip'] || // Nginx
      req.headers['x-forwarded-for'] || 
      req.socket.remoteAddress ||
      ""
    data.userId = req.user['id']
    const hasClockedOut = await this.attendanceService.hasUserClockedOut(data.userId);
    
    if(hasClockedOut) throw new HttpException(`User has already clocked out`, HttpStatus.CONFLICT)

    return this.attendanceService.clockOut(data);
  }

}
