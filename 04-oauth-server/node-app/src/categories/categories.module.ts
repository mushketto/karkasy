import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';
import { ProductsModule } from '../products/products.module'; // Импортируйте ProductsModule
import { Product } from '../entities/product.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    forwardRef(() => ProductsModule), // Используйте forwardRef для решения циклической зависимости
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
