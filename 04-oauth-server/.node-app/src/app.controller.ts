import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiExcludeController, ApiTags} from "@nestjs/swagger";

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}
@Get()
  getpublic(): string {
    return `${this.appService.getHello()} from public`;
  }
@Get('/user')
  getUser(): string {
    return `${this.appService.getHello()} from user`;
  }
@Get('/admin')
  getAdmin(): string {
    return `${this.appService.getHello()} from admin`;
  }
@Get('/all')
  getAll(): string {
    return `${this.appService.getHello()} from all`;
  }
}