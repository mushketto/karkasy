import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.find({ relations: ['category'] });
    return products; // Не модифицируем category, сохраняем типизацию
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Получаем категорию, если она указана, иначе null
    const category = createProductDto.categoryId
      ? await this.categoriesService.findOne(createProductDto.categoryId)
      : null;

    const product = this.productsRepository.create({
      ...createProductDto,
      category,
    });

    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: CreateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    // Получаем категорию, если она указана, иначе null
    const category = updateProductDto.categoryId
      ? await this.categoriesService.findOne(updateProductDto.categoryId)
      : null;

    // Обновляем категорию в продукте
    product.category = category;

    // Применяем обновления
    Object.assign(product, updateProductDto);

    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
