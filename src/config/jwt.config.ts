import { registerAs } from '@nestjs/config';

export interface JwtConfigI {
  refresh_secret: string;
  access_secret: string;
  access_time: string;
  refresh_time: string;
}

export const jwtConfig = registerAs<JwtConfigI>(
  'jwt',
  (): JwtConfigI => ({
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_time: process.env.JWT_ACCESS_TIME,
    refresh_time: process.env.JWT_REFRESH_TIME,
  }),
);
