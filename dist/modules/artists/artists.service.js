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
exports.ArtistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../../database/category.entity");
const artists_entity_1 = require("../../database/artists.entity");
const nestjs_cls_1 = require("nestjs-cls");
let ArtistsService = class ArtistsService {
    cls;
    dataSource;
    categoryRepo;
    artistRepo;
    constructor(cls, dataSource) {
        this.cls = cls;
        this.dataSource = dataSource;
        this.artistRepo = this.dataSource.getRepository(artists_entity_1.ArtistEntity);
        this.categoryRepo = this.dataSource.getRepository(category_entity_1.CategoryEntity);
    }
    async list() {
        try {
            return await this.artistRepo.find({
                relations: ['children', 'category', 'songs', 'albums', 'featuredAlbums', 'followers',],
            });
        }
        catch (err) {
            console.error('Error creating artist:', err);
            throw new common_1.BadRequestException('Failed to create artists: ' + (err.message || err));
        }
    }
    async findbyId(id) {
        try {
            const result = await this.artistRepo.findOne({
                where: { id },
                relations: ['children', 'category', 'songs'],
            });
            if (!result) {
                throw new common_1.NotFoundException(`Artists with id ${id} not found`);
            }
            return result;
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to find artists', err);
        }
    }
    async create(params, id) {
        try {
            console.log('Creating artist with params:', params);
            console.log('Category ID:', id);
            let parentArists = null;
            if (params.parentId) {
                parentArists = await this.artistRepo.findOneBy({ id: params.parentId });
                if (!parentArists) {
                    throw new common_1.NotFoundException('Parent artists not found');
                }
            }
            const category = await this.categoryRepo.findOne({ where: { id } });
            if (!category) {
                throw new common_1.NotFoundException("Category id is not found");
            }
            const artists = this.artistRepo.create({
                name: params.name,
                imageUrl: params.imgUrl,
                country: params.country,
                website: params.website,
                bio: params.bio,
                category,
            });
            await this.artistRepo.save(artists);
            return {
                message: 'Artists created successfully',
                artists,
            };
        }
        catch (err) {
            console.error('Error creating artist:', err);
            throw new common_1.BadRequestException('Failed to create artists: ' + (err.message || err));
        }
    }
    async update(id, params) {
        const artist = await this.artistRepo.findOne({ where: { id } });
        if (!artist)
            throw new common_1.NotFoundException('Artist not found');
        if (params.categoryId) {
            const category = await this.categoryRepo.findOne({ where: { id: params.categoryId } });
            if (!category)
                throw new common_1.NotFoundException('Category not found');
        }
        await this.artistRepo.update(id, params);
        const updatedArtist = await this.artistRepo.findOne({ where: { id } });
        return {
            message: 'Artist updated successfully',
            artist: updatedArtist,
        };
    }
    async delete(id) {
        try {
            const artists = await this.artistRepo.findOne({ where: { id } });
            if (!artists) {
                throw new common_1.NotFoundException("Actress not found");
            }
            await this.artistRepo.delete(id);
            return {
                message: "Artists deleted successfully",
                artists,
            };
        }
        catch (err) {
            throw new common_1.BadRequestException('Failed to delete artists', err);
        }
    }
};
exports.ArtistsService = ArtistsService;
exports.ArtistsService = ArtistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService,
        typeorm_2.DataSource])
], ArtistsService);
//# sourceMappingURL=artists.service.js.map