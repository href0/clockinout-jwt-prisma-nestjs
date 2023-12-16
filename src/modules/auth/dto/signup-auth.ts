import { Role } from "@prisma/client";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email     : string

  @ApiProperty()
  @IsNotEmpty()
  name      : string

  @ApiProperty()
  @IsNotEmpty()
  password  : string

  role : Role
  createdAt : number
  updatedAt : number
}
