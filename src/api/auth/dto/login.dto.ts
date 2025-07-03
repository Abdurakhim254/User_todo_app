import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class LoginAuthdto {
  
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
