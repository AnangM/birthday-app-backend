jest.useFakeTimers()
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user:any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Users service')
  })

  it('/users (POST) Invalid date format', () => {
    const payload = {
      "first_name": "E2E User Test",
      "last_name": "LA",
      "birth_date": "20-02/2000",
      "location": "America/Los_Angeles"
    }
    return request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect('Content-Type',/json/)
      .expect(400)
      .then(resp => {
        user = resp.body
      })
  })

  it('/users (POST) Invalid tamezone', () => {
    const payload = {
      "first_name": "E2E User Test",
      "last_name": "LA",
      "birth_date": "20-02-2000",
      "location": "America/Foo_Bar"
    }
    return request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect('Content-Type',/json/)
      .expect(400)
      .then(resp => {
        user = resp.body
      })
  })

  it('/users (POST)', () => {
    const payload = {
      "first_name": "E2E User Test",
      "last_name": "LA",
      "birth_date": "20-02-2000",
      "location": "America/Los_Angeles"
    }
    return request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect('Content-Type',/json/)
      .expect(201)
      .then(resp => {
        user = resp.body
      })

  })

  it('/users (PUT)',()=>{
    const payload = {
      "first_name": "E2E Updated User Test",
      "last_name": "LA",
      "birth_date": "20-02-2000",
      "location": "America/Los_Angeles"
    }
    return request(app.getHttpServer())
      .put(`/users/${user.id}`)
      .send(payload)
      .expect(200)
  })


  it('/users (Delete)',()=>{
    return request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(200)
  })

  afterAll(() => {
    app.close()
  })
});
