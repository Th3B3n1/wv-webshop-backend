import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products) private readonly productsRepository: Repository<Products>
  ) { }
  async create(req: (Request & { user: Users }), createCartDto: CreateCartDto) {
    let user: Users = await this.usersRepository.findOneOrFail({
      where: {
        id: req.user.id,
      }
    });
    let product: Products = await this.productsRepository.findOneOrFail({
      where: {
        id: createCartDto.product.id,
      }
    });
    await this.cartRepository.save({
      user: user,
      product: product,
      quantity: createCartDto.quantity,
    });
  }

  async findAll(req: (Request & { user: Users })) {
    return await this.cartRepository.find({
      relations: ['user', 'product'],
      select: {
        id: true,
        quantity: true,
        user: {
          id: true,
          username: true,
        },
        product: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      },
      where: {
        user: {
          id: req.user.id,
        },
      }
    });
  }

  async findOne(req: (Request & { user: Users }), id: number) {
    return await this.cartRepository.find({
      relations: ['user', 'product'],
      select: {
        id: true,
        quantity: true,
        user: {
          id: true,
          username: true,
        },
        product: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      },
      where: {
        id: id,
        user: {
          id: req.user.id,
        },
      }
    });
  }

  async update(req: (Request & { user: Users }), id: number, updateCartDto: UpdateCartDto) {
    let user: Users = await this.usersRepository.findOneOrFail({
      where: {
        id: req.user.id,
      }
    });
    let product: Products = await this.productsRepository.findOneOrFail({
      where: {
        id: updateCartDto.product?.id,
      }
    });
    await this.cartRepository.update({
      id: id,
      user: user,
    }, {
      product: product,
      quantity: updateCartDto.quantity,
    });
  }

  async remove(req: (Request & { user: Users }), id: number) {
    await this.cartRepository.delete({
      id: id,
      user: {
        id: req.user.id,
      }
    })
  }
}
