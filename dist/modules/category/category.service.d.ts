import { CategoryEntity } from "src/database/category.entity";
import { DataSource } from "typeorm";
import { CreateCategoryDto } from "./validations/create-category.validations";
import { FilterCategoryDto } from "./validations/filtered.category.dto";
import { UpdateCategoryDto } from "./validations/update-category.validations";
import { ClsService } from "nestjs-cls";
export declare class CategoryService {
    private cls;
    private dataSource;
    private artistRepo;
    private categoryRepo;
    constructor(cls: ClsService, dataSource: DataSource);
    list(): Promise<any[]>;
    findbyId(id: number): Promise<{
        category: CategoryEntity;
        message: string;
    }>;
    filter(dto: FilterCategoryDto): Promise<{
        data: CategoryEntity[];
        message: string;
    }>;
    create(params: CreateCategoryDto): Promise<{
        category: CategoryEntity | null;
        message: string;
    }>;
    update(id: number, params: UpdateCategoryDto): Promise<{
        message: string;
        category: CategoryEntity | null;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
