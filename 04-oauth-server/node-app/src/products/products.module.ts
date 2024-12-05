import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { CategoriesModule } from '../categories/categories.module'; // Импортируйте CategoriesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoriesModule), // Используйте forwardRef для решения циклической зависимости
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
