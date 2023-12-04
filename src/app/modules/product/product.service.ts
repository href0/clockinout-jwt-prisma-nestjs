import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ProductService {

  constructor(private prisma : PrismaService) {}

  async create(createProductDto: CreateProductDto, userId : number) {
    createProductDto.createdAt = new Date().getTime() / 1000
    createProductDto.updatedAt = new Date().getTime() / 1000
    createProductDto.createdId = userId
    createProductDto.updatedId = userId

    const create = await this.prisma.product.create({
      data : createProductDto,
      include : { createdBy : { select : { name : true } }, updatedBy : { select : { name : true } }, }
    })
    return {
      statusCode : 200,
      data : create
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
