import { Body, Controller, Delete, Get, NotFoundException, Post, Query, Param } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('')
    async index(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ): Promise<Pagination<Product>> {
        return this.productsService.paginate({ page, limit });
    }
    

    // products.controller.ts
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new NotFoundException(`Invalid ID format: ${id}`);
        }

        const product = await this.productsService.findOne(parsedId);

        if (!product) {
            throw new NotFoundException(`Product with ID ${parsedId} not found`);
        }

        return product;
    }

    // Створити новий продукт
    @Post('')
    async store(
        @Body() createProduct: Product, 
        @Body('categoryId') categoryId: number,
    ): Promise<Product> {
        return await this.productsService.create(createProduct, categoryId);
    }

    // Видалити продукт
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            throw new NotFoundException(`Invalid ID format: ${id}`);
        }
        await this.productsService.remove(parsedId);
    }
}
