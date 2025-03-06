import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() registerDto: RegisterDto): Promise<{ token: string, expiresAt: Date }> {
    return this.registerService.register(registerDto);
  }
}