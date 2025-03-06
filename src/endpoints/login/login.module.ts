import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { SecretService } from 'src/auth/secret/secret.service';
import { Tokens } from 'src/auth/entities/tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Tokens]),
  ],
  controllers: [LoginController],
  providers: [LoginService, SecretService],
})
export class LoginModule { }
