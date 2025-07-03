import { Injectable } from '@nestjs/common';
import { CreateAuthdto} from './dto/create-auth.dto';
import { PrismaService } from '@/common/prisma';
import { BcryptEncryption } from '@/infrastructure';
import { LoginAuthdto } from './dto/login.dto';
import { TokenService } from '@/common/guard/jwt.service';
import { TokensDto } from './dto/access.refresh.token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenservice:TokenService

  ){}
  async create(createAuthDto: CreateAuthdto) {
    const admin=await this.prismaService.user.findUnique({where:{email:createAuthDto.email}});

    if(admin){
      return {
        message:'User is already registered'
      }
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
      status_code:201,
      data:user
    }
  }

  async login(logindto:LoginAuthdto) {
    const user=await this.prismaService.user.findUnique({where:{email:logindto.email}})
    
    if(!user){
      return {
        message:'Email or password is incorrect'
      }

    }

    const isMatch=await BcryptEncryption.compare(logindto.password,user.password)
    if(!isMatch){
      return {
        message:'Email or password is incorrect'
      }
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

}
