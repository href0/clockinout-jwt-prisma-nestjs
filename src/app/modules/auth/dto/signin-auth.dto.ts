import { IsNotEmpty, IsEmail } from "class-validator";
export class SignInAuthDto {
  @IsNotEmpty()
  email     : string
  @IsNotEmpty()
  password  : string
}
