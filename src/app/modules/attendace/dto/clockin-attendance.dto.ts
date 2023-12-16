import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
export class ClockInAttendanceDto {
  userId : number
  clockIn : number

  @ApiProperty()
  @IsNotEmpty()
  clockInLatitude : string

  @ApiProperty()
  @IsNotEmpty()
  clockInLongitude : string

  clockInIpAddress : any

  createdAt : number
  updatedAt : number
}
