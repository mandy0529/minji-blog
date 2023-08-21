import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix middleware
  app.setGlobalPrefix('/api/v1');

  // cors
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  // validation middleware
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
