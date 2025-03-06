import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Access, AccessTypes } from 'src/decorators/access.decorator';
import { Users } from '../users/entities/users.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @Access(AccessTypes.RESTRICTED)
  create(@Req() req: (Request & {user: Users}), @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(req, createCartDto);
  }

  @Get()
  @Access(AccessTypes.RESTRICTED)
  findAll(@Req() req: (Request & {user: Users})) {
    return this.cartService.findAll(req);
  }

  @Get(':id')
  @Access(AccessTypes.RESTRICTED)
  findOne(@Req() req: (Request & {user: Users}), @Param('id') id: string) {
    return this.cartService.findOne(req, +id);
  }

  @Patch(':id')
  @Access(AccessTypes.RESTRICTED)
  update(@Req() req: (Request & {user: Users}), @Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(req, +id, updateCartDto);
  }

  @Delete(':id')
  @Access(AccessTypes.RESTRICTED)
  remove(@Req() req: (Request & {user: Users}), @Param('id') id: string) {
    return this.cartService.remove(req, +id);
  }
}
