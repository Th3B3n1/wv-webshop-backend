import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Products) private readonly productsRepository: Repository<Products>) {}
  async create(createProductDto: CreateProductDto): Promise<void> {
    await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Products> {
    return await this.productsRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
