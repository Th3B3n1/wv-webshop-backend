import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find({
      select: {
        id: true,
        username: true,
        email: true,
      }
    });
  }

  async findOne(id: number): Promise<Users> {
    return await this.usersRepository.findOneOrFail({
      select: {
        id: true,
        username: true,
        email: true,
      },
      where: {
        id: id,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
