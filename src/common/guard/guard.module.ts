import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigI } from 'src/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        secret: configService.get("access_secret"),
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
export class GuardModule {}
