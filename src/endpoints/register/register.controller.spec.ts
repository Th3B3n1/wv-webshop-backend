import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';

describe('RegisterController', () => {
  let controller: RegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Users])],
      controllers: [RegisterController],
      providers: [RegisterService],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
