import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('app module', () => {
    it('Should compile app module', async () => {
      const appModule: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
      }).compile();
      expect(appModule).toBeDefined();
      expect(appModule.get(AppService)).toBeInstanceOf(AppService);
      expect(appModule.get(AppController)).toBeInstanceOf(AppController);
    });
  })
});
