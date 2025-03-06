import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { compare } from 'bcrypt';
import { SecretService } from 'src/auth/secret/secret.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    private readonly secretService: SecretService,
  ) { }
  async login(loginDto: LoginDto): Promise<{token: string, expiresAt: Date}> {
    let user: Users = await this.usersRepository.findOneByOrFail({ email: loginDto.email });
    if (await compare(loginDto.password, user.password)) {
      return this.secretService.getToken(user);
    }
    throw new NotFoundException('Invalid credentials');
  }
}
