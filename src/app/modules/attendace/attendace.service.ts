import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ClockInAttendanceDto } from './dto/clockin-attendance.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { TimestampToDate } from 'src/app/utils/common-utils';
import { clockOutAttendanceDto } from './dto/clockout-attendace.dto';

@Injectable()
export class AttendaceService {

  constructor(
    private prisma : PrismaService
  ){}

  private readonly logger  = new Logger(AttendaceService.name)

  async clockIn(data: ClockInAttendanceDto) {
    const now = new Date().getTime() / 1000

    data.clockIn   = now
    data.createdAt = now
    data.updatedAt = now

    this.logger.log(`clock In user ${data.userId}`)
    const create = await this.prisma.attendace.create({
      data : data,
      select : { id: true, userId : true, clockIn : true, clockInIpAddress :true, clockInLatitude : true, clockInLongitude : true }
    })
    return {
      statusCode : 200,
      message : "Clock in success",
      data : create,
    }
  }

  async clockOut(data: clockOutAttendanceDto) {
    const clockIn = await this.hasUserClockedIn(data.userId)
    if(!clockIn) {
      const message = `User has not clocked in yet`
      this.logger.warn(message)
      throw new HttpException(message, HttpStatus.CONFLICT)
    }
    
    const now = new Date().getTime() / 1000
    data.clockOut   = now
    data.updatedAt = now

    this.logger.log(`clock Out user ${data.userId}`)
    const create = await this.prisma.attendace.update({
      where : { id : clockIn },
      data : data,
      select : { id : true, userId : true, clockOut : true, clockOutIpAddress :true, clockOutLatitude : true, clockOutLongitude : true }
    })
    return {
      statusCode : 200,
      message : "Clock out success",
      data : create,
    }
  }

  async hasUserClockedIn(userId : number) : Promise<number> {
    const now = new Date()
    const date = TimestampToDate(now.getTime(), true)
    const fromDate = new Date(date + " 00:00:01").getTime() / 1000
    const toDate = new Date(date + " 23:59:59").getTime() / 1000
    
    const userAttendance = await this.prisma.attendace.findFirst({
      where: {
        AND : [
          { clockIn : { gte : fromDate} },
          { clockIn : { lte : toDate }  },
          { userId : userId }
        ]
      },
      select : { id: true, userId : true, clockIn : true, clockInIpAddress :true, clockInLatitude : true, clockInLongitude : true }
    });
    return userAttendance ? userAttendance.id : 0

  }

  async hasUserClockedOut(userId : number) : Promise<Boolean> {
    const now = new Date()
    const date = TimestampToDate(now.getTime(), true)
    const fromDate = new Date(date + " 00:00:01").getTime() / 1000
    const toDate = new Date(date + " 23:59:59").getTime() / 1000

    const userAttendance = await this.prisma.attendace.findFirst({
      where: {
        AND : [
          { clockOut : { gte : fromDate} },
          { clockOut : { lte : toDate }  },
          { userId : userId }
        ]
      },
      select : { userId : true, clockIn : true, clockInIpAddress :true, clockInLatitude : true, clockInLongitude : true }
    });
    return !!userAttendance;

  }
}
