import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { Pagination } from 'src/core/filters/pagination';
import { Sort } from 'src/core/filters/sort';
import { User } from './interface/user.interface';
import { FilterUser, OrderBy } from './interface/filter.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtExpired, jwtConfig } from 'src/config/jwt/jwt.config';
import { AuthService } from '../auth/auth.service';
import  * as bcrypt from 'bcrypt'
import { Role } from '@prisma/client';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
@Injectable()
export class UserService {
  constructor(
    private prisma : PrismaService,
    private authService : AuthService,
    private jwtService : JwtService,
  ){}
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
        select : { id : true, email : true, name : true, role : true, createdAt : true, updatedAt : true },
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

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where : { id : id },
      select : { id : true, email : true, name : true, createdAt : true, updatedAt : true }
    })
    if(!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    return {
      statusCode : 200,
      data : user
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId : number, userRole : Role) {
    const user = await this.prisma.user.findUnique({
      where : { id : id }
    })
    if(!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    if(userRole !== 'ADMIN' && user.id !== userId) {
      this.logger.warn('Role USER Cannot Update another user')
      throw new HttpException('Cannot update another user', HttpStatus.NOT_ACCEPTABLE)
    }

    updateUserDto.updatedAt = new Date().getTime() / 1000
    const update = await this.prisma.user.update({
      where  : { id : id },
      data   : updateUserDto,
      select : { id : true, email : true, name : true, role : true, createdAt : true }
    })
    return {
      statusCode : 200,
      data       : update
    }
  }

  async updatePassword(id : number, password : string, userRole : Role, userId : number) {
    const user = await this.prisma.user.findUnique({
      where : { id : id }
    })
    if(!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    console.log('user', user)
  console.log('userId', userId)
    if(userRole !== 'ADMIN' && user.id !== userId) {
      this.logger.warn('Role USER Cannot Update another user')
      throw new HttpException('Cannot update another user', HttpStatus.NOT_ACCEPTABLE)
    }

    const saltOrRounds = 10;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const newPassword = await bcrypt.hash(password, salt);

    const data : UpdatePasswordUserDto = {
      password : newPassword,
      updatedAt : new Date().getTime() / 1000
    }
    const update = await this.prisma.user.update({
      where  : { id : id },
      data   : data,
      select : { id : true, email : true, name : true, role : true, createdAt : true }
    })

    return {
      statusCode : 200,
      data       : update,
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getToken(refreshToken : any){
    if(!refreshToken) throw new UnauthorizedException;
    const user = await this.prisma.user.findFirst({
        where: { refresh_token: refreshToken },
        select : { id: true, name : true, email : true, role : true}
    });
    if(!user) throw new UnauthorizedException
    try {
      await this.jwtService.verifyAsync(refreshToken, {secret : jwtConfig.refreshTokenSecret });
      user['sub'] = user.id
      delete user.id
      // generate new token
      const token = this.authService.generateToken(user, JwtExpired.ACCESS)
      return {
        statusCode : 200,
        data : { ...user, access_token : token }
      }
    } catch(err) {
      this.logger.error(err)
      throw new UnauthorizedException(err.message);
    }
  }
}
