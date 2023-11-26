import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email     : string

  @IsNotEmpty()
  name      : string

  @IsNotEmpty()
  @IsNumber()
  updatedAt : number
}