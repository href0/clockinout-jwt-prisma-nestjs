import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ClockInAttendanceDto } from './dto/clockin-attendance.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { clockOutAttendanceDto } from './dto/clockout-attendace.dto';
import { TimestampToDate } from 'src/core/utils/common-utils';

@Injectable()
export class AttendanceService {

  constructor(
    private prisma : PrismaService
  ){}

  private readonly logger  = new Logger(AttendanceService.name)

  async clockIn(data: ClockInAttendanceDto) {
    const now = new Date().getTime() / 1000
    data.clockIn   = now
    data.createdAt = now
    data.updatedAt = now

    this.logger.log(`clock In user ${data.userId}`)
    const create = await this.prisma.attendance.create({
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
    const create = await this.prisma.attendance.update({
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
    
    const userAttendance = await this.prisma.attendance.findFirst({
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

    const userAttendance = await this.prisma.attendance.findFirst({
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

  isClockInAvailable () {
    const date = new Date()
    const now = date.getTime()
    const current = TimestampToDate(now)

    /* NOTE : BISA DIUBAH SESUAI KEBIJAKAN / BISA DIMASUKKAN KE DATABASE UNTUK SETTING BATAS CLOCKIN */
    const [ currentDate, currentTime ] = current.split(" ")
    const MIN_TIME =  process.env.CLOCK_IN_MIN_TIME // waktu minimal bisa clock in, contoh = 06:00
    const MAX_TIME =  process.env.CLOCK_IN_MAX_TIME // keterlambatan paling lama bisa clockin, diatasnya sudah tidak boleh (dianggap tidak masuk), contoh = 11:00

    const minClockIn = new Date(currentDate + " " + MIN_TIME + ":00").getTime()
    const maxClockIn = new Date(currentDate + " " + MAX_TIME + ":00").getTime()
    
    if(now < minClockIn || now > maxClockIn) {
      return false
    } 
    return true
  }
}
