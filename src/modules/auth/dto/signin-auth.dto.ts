import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";
export class SignInAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  email     : string

  @ApiProperty()
  @IsNotEmpty()
  password  : string
}
