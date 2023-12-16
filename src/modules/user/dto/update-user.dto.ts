import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email     : string

  @ApiProperty()
  @IsNotEmpty()
  name      : string

  @IsNotEmpty()
  @IsNumber()
  updatedAt : number
}