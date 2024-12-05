import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Category } from '../categories/category.entity';
import { CategoriesModule } from '../categories/categories.module'; 

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Category]), 
        CategoriesModule, 
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule {}
