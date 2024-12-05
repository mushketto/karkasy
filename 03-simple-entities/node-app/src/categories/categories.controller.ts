import {Body, Controller, Delete, Get, NotFoundException, Post, Query, Req, Param} from '@nestjs/common';
import {Pagination} from "nestjs-typeorm-paginate";
import {Category} from "./category.entity";
import {CategoriesService} from "./categories.service";
import { Request } from 'express';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
    @Get('')
    index(@Query('page') page = 1,  @Query('limit') limit = 10): Promise<Pagination<Category>> {
        return this.categoriesService.paginate({limit:limit, page:  page});
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<Category | null> {
        const parsedId = parseInt(id, 10);
    
        if (isNaN(parsedId)) {
            throw new NotFoundException(`Invalid ID format: ${id}`);
        }
    
        const category = await this.categoriesService.findOne(parsedId);
    
        if (!category) {
            throw new NotFoundException(`Category #${parsedId} not found`);
        }
    
        return category;
    }

    @Post('')
    async store(@Body() categoryData: Category ): Promise<Category> {
        return await this.categoriesService.create(categoryData);
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        const parsedId = parseInt(id, 10);
    
        if (isNaN(parsedId)) {
            throw new NotFoundException(`Invalid ID format: ${id}`);
        }
    
        const deleteResult = await this.categoriesService.remove(parsedId);
    
        if (!deleteResult.affected) {
            throw new NotFoundException(`Category #${parsedId} not found`);
        }
    }
}
