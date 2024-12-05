import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {DeleteResult, Repository} from "typeorm";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private repository: Repository<Category>,
    ) {}

    public create(categoryData: Category): Promise<Category> {
        return this.repository.save(categoryData);
    }

    public findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    public async findOne(id: number): Promise<Category | null> {
        if (!id) {
            throw new Error('ID is required to find a category');
        }
        return this.repository.findOneBy({ id });
    }

    public async remove(id: number): Promise<DeleteResult> {
        if (!id) {
            throw new Error('ID is required to delete a category');
        }
        return this.repository.delete(id);
    }
    
    public paginate(options: IPaginationOptions): Promise<Pagination<Category>> {
        return paginate<Category>(this.repository, options);
    }
}
