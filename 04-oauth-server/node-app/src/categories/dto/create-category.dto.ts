import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Testing', description: 'Category name' })
  name: string;

  @ApiProperty({ example: 'Category of test poducts', description: 'Category description' })
  description?: string;
}
