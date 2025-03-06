import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() loginDto: LoginDto): Promise<{token: string, expiresAt: Date}> {
    return this.loginService.login(loginDto);
  }
}
