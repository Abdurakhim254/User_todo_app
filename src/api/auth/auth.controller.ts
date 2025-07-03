import { Controller, Get, Post, Body, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthdto } from './dto/create-auth.dto';
import { LoginAuthdto } from './dto/login.dto';
import { TokensDto } from './dto/access.refresh.token.dto';
import { ForgetPasswordDto } from './dto/forgot.password.dto';
import { Public } from '@/common/decorator';
import { UpdateAuthDto } from './dto/update.auth.dto';
import { ResetPassworddto } from './dto/reset.password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() createAuthDto: CreateAuthdto) {
    return this.authService.create(createAuthDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginAuthdto:LoginAuthdto) {    
    return this.authService.login(loginAuthdto);
  }



  @Get('me')
  getMe(@Req() req:any) {
    const email = req.user?.email;

    console.log(email);
    

    return this.authService.getMe(email);
  }

  
  @Put('me')
  updateMe(@Req() req:any,@Body() updateAuthDto: UpdateAuthDto) {
    const email = req.user?.email;
    return this.authService.updateMe(email,updateAuthDto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() tokendto:TokensDto ) {
    return this.authService.refreshtoken(tokendto);
  }

  @Public()
  @Post('forgot-password')
  forgotPassword(@Body() forgetpasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetpasswordDto);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() resetpassworddto: ResetPassworddto) {
    return this.authService.resetPassword(resetpassworddto);
  }


}
