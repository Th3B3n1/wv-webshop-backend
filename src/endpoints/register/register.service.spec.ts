import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { Users } from '../users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Users])],
      providers: [RegisterService],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
