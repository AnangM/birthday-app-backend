import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../../../src/notifications/job.entity';
import { createTestDB } from '../../../src/utils/testing/connection.helper';
import { UserEntity } from '../user.entity';
import { UsersController } from '../users.controller';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';


describe('UsersModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule,
        TypeOrmModule.forFeature([UserEntity, JobEntity]),
        TypeOrmModule.forRoot(createTestDB([UserEntity, JobEntity]))
    ],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(UsersController)).toBeInstanceOf(UsersController);
    expect(module.get(UsersService)).toBeInstanceOf(UsersService);
  });
});