import { IsString, IsNotEmpty } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  email     : string

  @IsNotEmpty()
  name      : string
  password  : string
  createdAt : number
  updatedAt : number
}
