import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Products]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }
