import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthdto } from './create-auth.dto';


export class UpdateAuthDto extends PartialType(CreateAuthdto){}