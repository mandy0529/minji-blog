import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('App e2e', () => {
  let app: INestApplication;

  // starting logic
  beforeAll(async () => {
    // app module
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // main.ts
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
  });

  // teardown logic
  afterAll(async () => {
    await app.close();
  });

  it.todo('✅ should pass');
});
