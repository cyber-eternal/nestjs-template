import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm/index';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer()).get('/ping').expect(200);
  });

  afterAll(async () => {
    const conn = app.get(Connection);
    await conn.close();
  });
});
