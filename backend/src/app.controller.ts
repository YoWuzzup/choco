import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Roles('admin')
  // @UseGuards(RolesGuard)
  @Get('/s')
  yeah(): string {
    return 'yeah';
  }
}
