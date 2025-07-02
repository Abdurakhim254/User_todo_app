import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export type ConfigType = {
  API_PORT: number;
  NODE_ENV: string;
  DB_URI: string;
  
};

const requiredVariables = [
  'API_PORT',
  'NODE_ENV',
  'DATABASE_URL',
 
];

const missingVariables = requiredVariables.filter((key) => {
  const value = process.env[key];
  return !value || value.trim() === '';
});

if (missingVariables.length > 0) {
  Logger.error(
    `Missing or empty required environment variables: ${missingVariables.join(', ')}`,
  );
  process.exit(1);
}

export const config: ConfigType = {
  API_PORT: parseInt(process.env.API_PORT as string, 10),
  NODE_ENV: process.env.NODE_ENV as string,
  DB_URI: process.env.DATABASE_URL as string,
};
