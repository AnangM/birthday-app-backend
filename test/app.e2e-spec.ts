import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createTestDB } from '../src/utils/testing/connection.helper';
import { UserEntity } from '../src/users/user.entity';
import { JobEntity } from '../src/notifications/job.entity';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot(createTestDB([UserEntity, JobEntity])),
        TypeOrmModule.forFeature([UserEntity, JobEntity])
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {

    let res = await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
    console.log(res.text)
    return res
  })


  it('/users (GET)', async () => {
    let res = await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Users service')
    console.log(res.text)
    return res
  })

  it('/users (POST) Invalid date format', async () => {
    const payload = {
      "first_name": "E2E User Test",
      "last_name": "LA",
      "birth_date": "20-02/2000",
      "location": "America/Los_Angeles"
    }
    let res = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(resp => {
        return resp.body
      })

    console.log(res)
    return res
  })

  it('/users (POST) Invalid tamezone', async () => {
    const payload = {
      "first_name": "E2E User Test",
      "last_name": "LA",
      "birth_date": "20-02-2000",
      "location": "America/Foo_Bar"
    }
    let res = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(500)
      .then(resp => {
        return resp.body
      })
    console.log(res)
    return res
  })

  it('/users (POST)', async () => {
    const payload = {
      "first_name": "E2E User Test",
      "last_name": "LA",
      "birth_date": "02-20-2000",
      "location": "America/Los_Angeles"
    }
    let res = await request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(resp => {
        user = resp.body
        return user
      })

    console.log(res)
    return res

  })

  it('/users/{id} (PUT)', async () => {
    const payload = {
      "first_name": "E2E Updated User Test",
      "last_name": "LA",
      "birth_date": "02-20-2000",
      "location": "America/Los_Angeles"
    }
    let res = await request(app.getHttpServer())
      .put(`/users/${user.id}`)
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((r) => {
        console.log(r.body)
        return r.body
      })
      .catch((e) => {
        console.log(e)
        return e.message
      })
    return res
  })


  it('/users/{id} (Delete)', async () => {
    let res = await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(200)
    console.log(res.body)
    return res
  })

  afterAll(() => {
    app.close()
  })
});
