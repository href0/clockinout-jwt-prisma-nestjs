import { Injectable, Logger, HttpException, HttpStatus  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Pagination } from 'src/core/filters/pagination';
import { Prisma } from '@prisma/client';
import { Sort } from 'src/core/filters/sort';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from './interface/user.interface';
import { FilterUser, OrderBy } from './interface/filter.interface';

@Injectable()
export class UserService {
  constructor(private prisma : PrismaService){}
  private readonly logger  = new Logger(UserService.name)
  async create(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date().getTime() / 1000
    createUserDto.updatedAt = new Date().getTime() / 1000
    const create = await this.prisma.user.create({
      data : createUserDto
    })
    return {
      statusCode : 201,
      data : create
    }
  }

  async findAll(filter: FilterUser) : Promise<{ items : User[], pagination : Pagination }> {
    const page = filter.page || 1
    const perPage = filter.perPage || 10
    let search = filter.email
    if(filter.name) {
      search = filter.name
    }
    const allowedOrderBy = [ 'updatedAt', 'createdAt', 'name', 'email', 'id' ]
    if(!allowedOrderBy.includes(filter.sortBy)){
      filter.sortBy = OrderBy.updatedAt
    }
    const allowedSort = ['asc', 'desc']
    if(!allowedSort.includes(filter.sort.toLocaleLowerCase().trim())){
      filter.sort = Sort.DESC
    }
    const skip = (page - 1) * perPage;
    this.logger.log('BEGIN GET USER')
    const [ totalCount, items ] = await Promise.all([
      this.prisma.user.count({ where :  { [filter.email ? "email" : "name"] : { contains : search } } }),
      this.prisma.user.findMany({
        where : { [filter.email ? "email" : "name"] : { contains : search } } ,
        skip,
        take: perPage,
        orderBy : { [filter.sortBy] : filter.sort },
      })
    ])
    if(items.length === 0) this.logger.warn("NO DATA")
    const totalPages = Math.ceil(totalCount / perPage);
    const currentPage = page;

    const pagination = new Pagination()
    pagination.total_items  = totalCount
    pagination.total_pages  = totalPages
    pagination.current_page = currentPage
    pagination.per_page     = perPage

    return { items, pagination }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
