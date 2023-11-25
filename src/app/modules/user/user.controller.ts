import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sort } from 'src/core/filters/sort';
import { FilterUser } from './interface/filter.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('page') page : number,
    @Query('perPage') perPage : number,
    @Query('name') name : string,
    @Query('email') email : string,
    @Query('sort') sort : Sort,
    @Query('sortBy') sortBy : string,
    @Req() request : Request,
  ){
    const baseUrl = request['protocol'] + '://' + request.headers['host']
    const curentUrl = request.url
    const filter : FilterUser = {
      page    : +page,
      perPage : +perPage,
      name,
      email,
      sort,
      sortBy
    }
    const { items, pagination } = await this.userService.findAll(filter)
    let nextPage = Number(page) + 1
    if( page >= pagination.total_pages ) {
      nextPage = null
    }
    const firstUrl = (items.length > 0 || pagination.total_pages > 0) ? baseUrl + curentUrl.replace(`page=${page}`, `page=${1}`) : null
    const lastUrl = (items.length > 0 || pagination.total_pages > 0) ? baseUrl + curentUrl.replace(`page=${page}`, `page=${pagination.total_pages}`) : null
    const nextUrl = nextPage ? baseUrl + curentUrl.replace(`page=${page}`, `page=${nextPage}`) : null
    const prevUrl = page > 1 ? baseUrl + curentUrl.replace(`page=${page}`, `page=${Number(page) - 1}`) : null
    const links = {
      next  : nextUrl,
      prev  : prevUrl,
      first : firstUrl,
      last  : lastUrl
    }
    pagination.links = links
    return {
      data          : items,
      pagination    : pagination,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
