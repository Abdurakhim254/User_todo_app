import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { UserRoles } from '@prisma/client'; 

export class CreateAdminDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
