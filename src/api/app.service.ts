import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@/infrastructure';

export class Application {
  static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors({origin:"*",methods:["POST","GET","PUT","DELETE"]});
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    app.listen(config.API_PORT || 3000);

  }
}
