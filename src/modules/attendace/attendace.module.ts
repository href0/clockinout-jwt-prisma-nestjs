import { Module } from '@nestjs/common';
import { AttendanceService } from './attendace.service';
import { AttendaceController } from './attendace.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  controllers: [AttendaceController],
  providers: [AttendanceService],
})
export class AttendaceModule {}
