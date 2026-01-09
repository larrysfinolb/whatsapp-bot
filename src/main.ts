import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new ApiExceptionFilter(), new PrismaExceptionFilter());

  await app.listen(envs.port);
}
bootstrap();
