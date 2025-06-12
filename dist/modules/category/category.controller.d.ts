import { CategoryService } from "./category.service";
import { FilterCategoryDto } from "./validations/filtered.category.dto";
import { CreateCategoryDto } from "./validations/create-category.validations";
import { UpdateCategoryDto } from "./validations/update-category.validations";
export declare class CategoryController {
    private CategoryService;
    constructor(CategoryService: CategoryService);
    list(): Promise<any[]>;
    filterCategories(dto: FilterCategoryDto): Promise<{
        data: import("../../database/category.entity").CategoryEntity[];
        message: string;
    }>;
    findbyId(id: number): Promise<{
        category: import("../../database/category.entity").CategoryEntity;
        message: string;
    }>;
    create(body: CreateCategoryDto): Promise<{
        category: import("../../database/category.entity").CategoryEntity | null;
        message: string;
    }>;
    update(id: number, body: UpdateCategoryDto): Promise<{
        message: string;
        category: import("../../database/category.entity").CategoryEntity | null;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
