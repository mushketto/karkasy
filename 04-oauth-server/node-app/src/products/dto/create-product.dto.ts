import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Test', description: 'Product name' })
  name: string;

  @ApiProperty({ example: 10, description: 'Product price' })
  price: number;

  @ApiProperty({ example: 'Test product', description: 'Product description' })
  description?: string;

  @ApiProperty({ example: 1, description: 'Category ID' })
  categoryId: number;
}