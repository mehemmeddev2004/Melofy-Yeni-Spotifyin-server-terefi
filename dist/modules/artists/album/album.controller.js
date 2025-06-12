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
exports.AlbumController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const create_album_dto_1 = require("./validations/create-album.dto");
const update_album_dto_1 = require("./validations/update-album.dto");
const filter_album_dto_1 = require("./validations/filter-album.dto");
let AlbumController = class AlbumController {
    albumService;
    constructor(albumService) {
        this.albumService = albumService;
    }
    async list() {
        return await this.albumService.list();
    }
    async filter(filter) {
        return await this.albumService.filter(filter);
    }
    async findById(id) {
        const album = await this.albumService.findById(id);
        if (!album)
            throw new common_1.NotFoundException(`Album with id ${id} not found`);
        return album;
    }
    async create(params) {
        return await this.albumService.create(params);
    }
    async update(id, params) {
        return await this.albumService.update(params, id);
    }
    async delete(id) {
        return await this.albumService.delete(id);
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('filter'),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/album.entity").AlbumEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_album_dto_1.FilterAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "filter", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/album.entity").AlbumEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: [require("../../../database/album.entity").AlbumEntity] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_album_dto_1.CreateAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/album.entity").AlbumEntity }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_album_dto_1.UpdateAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "delete", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)('album'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map