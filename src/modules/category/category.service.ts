import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { CategoryEntity } from "src/database/category.entity";
import { DataSource, Repository, IsNull } from "typeorm";
import { CreateCategoryDto } from "./validations/create-category.validations";
import { FilterCategoryDto } from "./validations/filtered.category.dto";
import { UpdateCategoryDto } from "./validations/update-category.validations";
import { ClsService } from "nestjs-cls";
import { ArtistEntity } from "src/database/artists.entity";

@Injectable()
export class CategoryService {
  private artistRepo: Repository<ArtistEntity>
  private categoryRepo: Repository<CategoryEntity>;

  constructor(
    private cls: ClsService,
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.artistRepo = this.dataSource.getRepository(ArtistEntity)
    this.categoryRepo = this.dataSource.getRepository(CategoryEntity);
  }

async list() {
  try {
    const categories = await this.categoryRepo.find({
      where: { parentId: IsNull() },
      relations: ['children', 'artists', 'albums'],
    });

  
    return categories.map(category => {
      const result: any = { ...category };

      if (!category.artists || category.artists.length === 0) {
        delete result.artists;
      }
      if (!category.albums || category.albums.length === 0) {
        delete result.albums;
      }

   
      if (result.children && result.children.length > 0) {
        result.children = result.children.map(child => {
          const childResult: any = { ...child };

          if (!child.artists || child.artists.length === 0) {
            delete childResult.artists;
          }
          if (!child.albums || child.albums.length === 0) {
            delete childResult.albums;
          }

          return childResult;
        });
      }

      return result;
    });
  } catch (err) {
    throw new BadRequestException('Failed to list categories', err);
  }
}


  async findbyId(id: number) {
    try {
      const category = await this.categoryRepo.findOne({
        where: { id },
        relations: ['children'],
      });

      if (!category) {
        throw new NotFoundException("Category id is not found");
      }

      return {
        category,
        message: "Category found successfully",
      };
    } catch (err) {
      throw new BadRequestException('Failed to find category',err);
    }
  }

async filter(dto: FilterCategoryDto) {
  try {
    const query = this.categoryRepo.createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children')
      .leftJoinAndSelect('category.parent', 'parent');

    if (dto.name) {
      query.andWhere('LOWER(category.name) LIKE LOWER(:name)', { name: `%${dto.name}%` });
    }

    if (dto.slug) {
      query.andWhere('LOWER(category.slug) LIKE LOWER(:slug)', { slug: `%${dto.slug}%` });
    }

    if (dto.parentId !== undefined && dto.parentId !== null) {
      const parentId = Number(dto.parentId);
      if (!isNaN(parentId)) {
        query.andWhere('category.parentId = :parentId', { parentId });
      }
    }

    const result = await query.getMany();

    return {
      data: result,
      message: "Filtered categories retrieved successfully",
    };
  } catch (err) {
    throw new BadRequestException('Failed to filter categories', err);
  }
}


async create(params: CreateCategoryDto) {
  try {
    let parentCategory: CategoryEntity | null = null;

   

    const category = this.categoryRepo.create({
      ...params,
      parent: parentCategory || undefined,
    });

    const savedCategory = await this.categoryRepo.save(category);

    
    const categoryWithRelations = await this.categoryRepo.findOne({
      where: { id: savedCategory.id },
      relations: ['parent', 'parent.children'],
    });

    return {
      category: categoryWithRelations,
      message: "Category created successfully",
    };
  } catch (err) {
    throw new BadRequestException('Failed to create category', err);
  }
}


  async update(id: number, params: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepo.findOne({ where: { id } });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (params.parentId) {
        const parent = await this.categoryRepo.findOne({
          where: { id: params.parentId },
        });

        if (!parent) {
          throw new BadRequestException('Parent category not found');
        }
      }

      await this.categoryRepo.update(id, params);

      const updatedCategory = await this.categoryRepo.findOne({ where: { id } });

      return {
        message: 'Category updated successfully',
        category: updatedCategory,
      };
    } catch (err) {
      throw new BadRequestException('Failed to update category',err);
    }
  }

  async delete(id: number) {
    try {
      const category = await this.categoryRepo.findOne({ where: { id } });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      await this.categoryRepo.delete(id);

      return {
        message: 'Category deleted successfully',
      };
    } catch (err) {
      throw new BadRequestException('Failed to delete category',err);
    }
  }
}
