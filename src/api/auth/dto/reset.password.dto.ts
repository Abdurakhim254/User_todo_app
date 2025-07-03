import { IsNotEmpty, IsString} from 'class-validator';

export class ResetPassworddto {
  
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
