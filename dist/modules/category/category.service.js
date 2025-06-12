"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../database/category.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const artists_entity_1 = require("../../database/artists.entity");
let CategoryService = class CategoryService {
    cls;
    dataSource;
    artistRepo;
    categoryRepo;
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.artistRepo = this.dataSource.getRepository(artists_entity_1.ArtistEntity);
        this.categoryRepo = this.dataSource.getRepository(category_entity_1.CategoryEntity);
    }
    async list() {
        try {
            const categories = await this.categoryRepo.find({
                where: { parentId: (0, typeorm_2.IsNull)() },
                relations: ['children', 'artists', 'albums'],
            });
            return categories.map(category => {
                const result = { ...category };
                if (!category.artists || category.artists.length === 0) {
                    delete result.artists;
                }
                if (!category.albums || category.albums.length === 0) {
                    delete result.albums;
                }
                if (result.children && result.children.length > 0) {
                    result.children = result.children.map(child => {
                        const childResult = { ...child };
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
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to list categories', err);
        }
    }
    async findbyId(id) {
        try {
            const category = await this.categoryRepo.findOne({
                where: { id },
                relations: ['children'],
            });
            if (!category) {
                throw new common_1.NotFoundException("Category id is not found");
            }
            return {
                category,
                message: "Category found successfully",
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to find category', err);
        }
    }
    async filter(dto) {
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
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to filter categories', err);
        }
    }
    async create(params) {
        try {
            let parentCategory = null;
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
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to create category', err);
        }
    }
    async update(id, params) {
        try {
            const category = await this.categoryRepo.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            if (params.parentId) {
                const parent = await this.categoryRepo.findOne({
                    where: { id: params.parentId },
                });
                if (!parent) {
                    throw new common_1.BadRequestException('Parent category not found');
                }
            }
            await this.categoryRepo.update(id, params);
            const updatedCategory = await this.categoryRepo.findOne({ where: { id } });
            return {
                message: 'Category updated successfully',
                category: updatedCategory,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to update category', err);
        }
    }
    async delete(id) {
        try {
            const category = await this.categoryRepo.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            await this.categoryRepo.delete(id);
            return {
                message: 'Category deleted successfully',
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to delete category', err);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], CategoryService);
//# sourceMappingURL=category.service.js.map