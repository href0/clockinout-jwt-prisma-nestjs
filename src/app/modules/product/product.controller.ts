import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req : Request
  ) {
    const userId = req.user['id']
    return this.productService.create(createProductDto, userId);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
