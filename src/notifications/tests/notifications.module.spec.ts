import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../src/users/user.entity';
import { JobEntity } from '../../../src/notifications/job.entity';
import { createTestDB } from '../../../src/utils/testing/connection.helper';
import { NotificationModule } from '../notifications.module';
import { NotificationService } from '../notifications.service';


describe('UsersModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [NotificationModule,
        TypeOrmModule.forFeature([UserEntity, JobEntity]),
        TypeOrmModule.forRoot(createTestDB([UserEntity, JobEntity]))
    ],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(NotificationService)).toBeInstanceOf(NotificationService);
  });
});