import { JwtConfigI } from '@/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { TokenService } from './jwt.service';


@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
          global: true,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<JwtConfigI>) => ({
            secret: configService.get('access_secret'),
            signOptions: { expiresIn: configService.get('access_time') },
          }),
        }),
        JwtModule.registerAsync({
          global: true,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<JwtConfigI>) => ({
            secret: configService.get('refresh_secret'),
            signOptions: { expiresIn: configService.get('refresh_time') },
          }),
        }),
      ],
      providers: [TokenService, AuthGuard],
      exports: [TokenService, AuthGuard],
})
export class AuthModule {}