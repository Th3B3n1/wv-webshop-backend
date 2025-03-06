import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Users])],
      providers: [LoginService],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
