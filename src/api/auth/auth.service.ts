import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthdto} from './dto/create-auth.dto';
import { PrismaService } from '@/common/prisma';
import { BcryptEncryption } from '@/infrastructure';
import { LoginAuthdto } from './dto/login.dto';
import { TokenService } from '@/common/guard/jwt.service';
import { TokensDto } from './dto/access.refresh.token.dto';
import { ForgetPasswordDto } from './dto/forgot.password.dto';
import { UpdateAuthDto } from './dto/update.auth.dto';
import { ResetPassworddto } from './dto/reset.password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenservice:TokenService

  ){}
  async create(createAuthDto: CreateAuthdto) {
    const admin=await this.prismaService.user.findUnique({where:{email:createAuthDto.email}});

    if(admin){
      throw new BadRequestException({
        message:'User is already registered'
      })
    }

    const hashed_password=await BcryptEncryption.encrypt(createAuthDto.password)

    const user=await this.prismaService.user.create({
      data:{
        email: createAuthDto.email,
          password: hashed_password,
          full_name: createAuthDto.full_name,
          role:createAuthDto.role,
      }
    })

    return {
      message:"You have successfully registered.",
      data:user
    }
  }

  async login(logindto:LoginAuthdto) {
    const user=await this.prismaService.user.findUnique({where:{email:logindto.email}})
    
    if(!user){
      throw new BadRequestException({
        message:'Email or password is incorrect'
      })

    }

    const isMatch=await BcryptEncryption.compare(logindto.password,user.password)
    if(!isMatch){
      throw new BadRequestException({
        message:'Email or password is incorrect'
      })
    }
    const payload={
      email:user.email,
      role:user.role
    }
    
    const access_token= this.tokenservice.createAccessToken(payload)
    const refresh_token= this.tokenservice.createRefreshToken(payload)
    
    return {
      message:'User is registered',
      access_token,
      refresh_token
    }
  }

  async refreshtoken(tokendto:TokensDto) {
    const datas=await this.tokenservice.verifyRefreshToken(tokendto.refresh_token)
    
    const payload={
      email:datas.email,
      role:datas.role
    }
    
    const access_token=this.tokenservice.createAccessToken(payload)
    const refresh_token=this.tokenservice.createRefreshToken(payload)

    return {
      access_token,
      refresh_token
    }
  }

  async forgetPassword(forgetdto:ForgetPasswordDto) {
    const user=await this.prismaService.user.findUnique({where:{email:forgetdto.email}})
    if(!user){
      throw new NotFoundException( {
        message:'User not found'
      })
    }
    else{
      const payload={
        email:user.email,
        role:user.role
      }
      const access_token=this.tokenservice.createAccessToken(payload)
      return {
        access_token
      }
    }
  }

  async getMe(email:string){
    const user=await this.prismaService.user.findUnique({where:{email:email}})
    return {
      message:'User found successfully',
      data:user
    }
  }

  async updateMe(email: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const updateData: any = {
      full_name: updateAuthDto.full_name,
    };
  
    if (updateAuthDto.password) {
      const hashedPassword = await BcryptEncryption.encrypt(updateAuthDto.password);
      updateData.password = hashedPassword;
    }
  
    const updatedUser = await this.prismaService.user.update({
      where: { email },
      data: updateData,
    });
  
    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }
  

  async resetPassword(resetpassworddto:ResetPassworddto){
    const payload=await this.tokenservice.verifyAccessToken(resetpassworddto.access_token)
    await this.prismaService.user.findUnique({where:{email:payload.email}})
    const hashed_password=await BcryptEncryption.encrypt(resetpassworddto.password)
    const updatedUser=await this.prismaService.user.update({where:{email:payload.email},data:{password:hashed_password}})
    return {
      message:'Password updated successfully',
      updatedUser
    }

  }
}

