import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../categories/category.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    // Створення продукту
    public async create(productData: Product, categoryId: number): Promise<Product> {
        const category = await this.categoryRepository.findOneBy({ id: categoryId });

        if (!category) {
            throw new Error(`Категорія з ID ${categoryId} не знайдена`);
        }

        const product = this.productRepository.create({ ...productData, category });
        return this.productRepository.save(product);
    }

    public paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
        return paginate<Product>(this.productRepository, options, {
            relations: ['category'], // Завантаження категорії разом з продуктом
        });
    }

    // Отримати продукт за ID
    public async findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { id },
            relations: ['category'],
        });
    }

    // Видалення продукту
    public async remove(id: number): Promise<void> {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }

        await this.productRepository.remove(product);
    }
}
