import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthdto } from './dto/create-auth.dto';
import { LoginAuthdto } from './dto/login.dto';
import { TokensDto } from './dto/access.refresh.token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthdto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthdto:LoginAuthdto) {    
    return this.authService.login(loginAuthdto);
  }


  @Get('me')
  getMe(@Body() createAuthDto: CreateAuthdto) {
    return this.authService.create(createAuthDto);
  }

  @Put('me')
  updateMe(@Body() createAuthDto: CreateAuthdto) {
    return this.authService.create(createAuthDto);
  }

  @Post('refresh')
  refresh(@Body() tokendto:TokensDto ) {
    return this.authService.refreshtoken(tokendto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() createAuthDto: CreateAuthdto) {
    return this.authService.create(createAuthDto);
  }

  @Post('reset-password')
  resetPassword(@Body() createAuthDto: CreateAuthdto) {
    return this.authService.create(createAuthDto);
  }


}
