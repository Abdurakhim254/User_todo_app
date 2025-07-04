import { IsNotEmpty, IsString} from 'class-validator';

export class ResetPassworddto {
  
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
