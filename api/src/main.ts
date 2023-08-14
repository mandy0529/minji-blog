import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix middleware
  app.setGlobalPrefix('/api/v1');

  // cors
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
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
