import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/products.entity';
import { Access, AccessTypes } from 'src/decorators/access.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Access(AccessTypes.ADMIN)
  create(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Products> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Access(AccessTypes.ADMIN)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<void> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Access(AccessTypes.ADMIN)
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
