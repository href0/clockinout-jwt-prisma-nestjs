import { IsNotEmpty, IsNumber } from "class-validator";
export class UpdatePasswordUserDto {
  @IsNotEmpty()
  password      : string

  @IsNotEmpty()
  @IsNumber()
  updatedAt : number
}