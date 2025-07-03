import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigI } from 'src/config';
import { TokenProps } from '../interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JwtConfigI;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get<JwtConfigI>('jwt');
  }

  createAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.access_secret,
      expiresIn: this.jwtConfig.access_time || '5m',
    });
  }

  createRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.jwtConfig.refresh_secret,
      expiresIn: this.jwtConfig.refresh_time || '10m',
    });
  }
  async verifyAccessToken(token: string): Promise<any> {
    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfig.access_secret,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async verifyRefreshToken(token: string): Promise<TokenProps> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfig.refresh_secret,
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
