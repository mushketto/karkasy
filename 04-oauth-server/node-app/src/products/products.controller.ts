import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '../entities/product.entity';
import { AppService } from '../app.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth} from '@nestjs/swagger';



@ApiTags('products')
@ApiBearerAuth('JWT') 
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles({ roles: ['user'] })
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, type: Product })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: [Product] })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['user'] })
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @Roles({ roles: ['user'] }) 
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, type: Product })
  update(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles({ roles: ['user'] }) 
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}