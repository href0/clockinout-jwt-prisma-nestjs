import { Module } from '@nestjs/common';
import { AttendaceService } from './attendace.service';
import { AttendaceController } from './attendace.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  controllers: [AttendaceController],
  providers: [AttendaceService],
})
export class AttendaceModule {}
