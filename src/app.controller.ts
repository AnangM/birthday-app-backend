import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('home')
  @ApiOperation({
    summary:'Check if server reseponds anything'
  })
  @ApiResponse({
    status:200,
    description:'Valid response',
    type:String
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
