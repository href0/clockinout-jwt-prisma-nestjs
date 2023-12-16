import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Req, UseGuards, HttpException, Put, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/guard/roles.guard';
import { Role, Roles } from '../../../core/decorators/role.decorator';
import { Request } from 'express'
import { Public } from 'src/core/decorators/public.decorator';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UsePipes(ValidationPipe)
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @ApiBearerAuth('accessToken')
  @ApiQuery({ name : 'sortBy', required : false, type : "string" })
  @ApiQuery({ name : 'sort', required : false, type : "string" })
  @ApiQuery({ name : 'name', required : false, type : "string" })
  @ApiQuery({ name : 'email', required : false, type : "string" })
  @ApiQuery({ name : 'perPage', required : true, type : "number", })
  @ApiQuery({ name : 'page', required : true, type : "number" })
  @Get()
  async findAll(
    @Query() filter : FilterUserDto,
    @Req() request : Request,
  ){
    const baseUrl = request['protocol'] + '://' + request.headers['host']
    const curentUrl = request.url
    const { items, pagination } = await this.userService.findAll(filter)
    let nextPage = Number(filter.page) + 1
    if( filter.page >= pagination.total_pages ) {
      nextPage = null
    }
    const firstUrl = (items.length > 0 || pagination.total_pages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${1}`) : null
    const lastUrl = (items.length > 0 || pagination.total_pages > 0) ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${pagination.total_pages}`) : null
    const nextUrl = nextPage ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${nextPage}`) : null
    const prevUrl = filter.page > 1 ? baseUrl + curentUrl.replace(`page=${filter.page}`, `page=${Number(filter.page) - 1}`) : null
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

  @ApiBearerAuth('accessToken')
  @Get(':id')
  findOne(@Param('id') id: string) {
    const check = Number(id)
    if(isNaN(check)) throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST)
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth('accessToken')
  @Patch(':id') 
  update(
    @Param('id') id: number, 
    @Body() updateUserDto: UpdateUserDto,
    @Req() request : Request
  ) {
    if(isNaN(id)) throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST)
    const userId = request.user['id']
    const userRole = request.user['role']
    return this.userService.update(+id, updateUserDto, userId, userRole);
  }

  @ApiBearerAuth('accessToken')
  @Post('change-password/:id')
  changePassword(
    @Param('id') id: number, 
    @Body() body : UpdatePasswordUserDto,
    @Req() request : Request
  ) {
    if(isNaN(id)) throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST)
    const userId = request.user['id']
    const userRole = request.user['role']
    return this.userService.updatePassword(+id, body.password , userRole, userId);
  }

  @ApiBearerAuth('accessToken')
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @Req() request : Request
  ) {
    if(isNaN(id)) throw new HttpException('id must be a number', HttpStatus.BAD_REQUEST)
    const userId = request.user['id']
    const userRole = request.user['role']
    return this.userService.remove(+id, userId, userRole);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Req() req : Request){
    return this.userService.getToken(req.cookies.refreshToken)
  }
}
