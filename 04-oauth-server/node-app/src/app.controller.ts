import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('App')
@ApiBearerAuth('JWT') 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/public')
  @Unprotected() // без аутентификации
  getPublic(): string {
    return this.appService.getHello() + ' - Public';
  }
 
  //  'user'
  @Get('/user')
  @Roles({ roles: ['user'] })  // Проверка роли 'user'
  getUser(): string {
    return this.appService.getHello() + ' - User';
  }

  // 'admin'
  @Get('/admin')
  @Roles({ roles: ['admin'] }) // Проверка роли 'admin'
  getAdmin(): string {
    return this.appService.getHello() + ' - Admin';
  }

  // для всех
  @Get('/all')
  getAll(): string {
    return this.appService.getHello() + ' - All';
  }
}
