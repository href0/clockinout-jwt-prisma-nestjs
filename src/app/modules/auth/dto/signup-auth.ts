import { Role } from "@prisma/client";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";
export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email     : string
  @IsNotEmpty()
  name      : string
  @IsNotEmpty()
  password  : string

  role : Role
  createdAt : number
  updatedAt : number
}
