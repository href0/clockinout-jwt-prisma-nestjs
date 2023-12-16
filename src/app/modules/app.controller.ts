import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/core/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Public()
  @Get()
  @ApiTags('Href')
  getHello(): string {
    return this.appService.getHello();
  }
}
