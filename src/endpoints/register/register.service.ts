import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { hash } from 'bcrypt';
import { SecretService } from 'src/auth/secret/secret.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    private readonly secretService: SecretService,
  ) { }
  async register(registerDto: RegisterDto): Promise<{ token: string, expiresAt: Date }> {
    let user: Users = await this.usersRepository.save({
      username: registerDto.username,
      email: registerDto.email,
      password: await hash(registerDto.password, 10),
    })
    return this.secretService.getToken(user);
  }
}
