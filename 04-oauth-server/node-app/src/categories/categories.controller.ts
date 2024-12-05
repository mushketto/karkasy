import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { AppService } from '../app.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiTags('categories')
@ApiBearerAuth('JWT') 
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles({ roles: ['admin'] })
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['admin'] })
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: Category })
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @Roles({ roles: ['admin'] }) 
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, type: Category })
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles({ roles: ['admin'] }) 
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }
}