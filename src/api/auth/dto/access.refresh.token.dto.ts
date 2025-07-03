import { IsNotEmpty, IsString } from 'class-validator';

export class TokensDto {
  
  @IsNotEmpty()
  @IsString()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  refresh_token: string;

}
