import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class clockOutAttendanceDto {
  userId : number
  clockOut : number

  @ApiProperty()
  @IsNotEmpty()
  clockOutLatitude : string

  @ApiProperty()
  @IsNotEmpty()
  clockOutLongitude : string

  clockOutIpAddress : any

  updatedAt : number
}
