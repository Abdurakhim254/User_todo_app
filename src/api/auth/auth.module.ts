import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GuardModule } from '@/common/guard';

@Module({
  imports:[GuardModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
