import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { SecretService } from 'src/auth/secret/secret.service';
import { Tokens } from 'src/auth/entities/tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Tokens]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, SecretService],
})
export class RegisterModule { }
