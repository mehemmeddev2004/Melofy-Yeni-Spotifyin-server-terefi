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
exports.PlaylistController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const playlist_service_1 = require("./playlist.service");
const filter_playlist_dto_1 = require("./validations/filter-playlist.dto");
const create_playlist_dto_1 = require("./validations/create-playlist.dto");
const update_playlist_dto_1 = require("./validations/update-playlist.dto");
const swagger_1 = require("@nestjs/swagger");
const Auth_guard_1 = require("../../../guards/Auth.guard");
let PlaylistController = class PlaylistController {
    playlistService;
    constructor(playlistService) {
        this.playlistService = playlistService;
    }
    list() {
        return this.playlistService.list();
    }
    findById(id) {
        return this.playlistService.findById(id);
    }
    filter(query) {
        return this.playlistService.filter(query);
    }
    async create(body) {
        return this.playlistService.create(body);
    }
    async update(id, params) {
        return this.playlistService.update(params, id);
    }
    async delete(id) {
        return this.playlistService.delete(id);
    }
};
exports.PlaylistController = PlaylistController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/playlist.entity").PlaylistEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/playlist.entity").PlaylistEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('filter'),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/playlist.entity").PlaylistEntity] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_playlist_dto_1.FilterPlaylistDto]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "filter", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, common_1.Post)('owner/:ownerId'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_playlist_dto_1.CreatePlaylistDto]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_playlist_dto_1.UpdatePlaylistDto]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlaylistController.prototype, "delete", null);
exports.PlaylistController = PlaylistController = __decorate([
    (0, common_1.Controller)('playlist'),
    __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
], PlaylistController);
//# sourceMappingURL=playlist.controller.js.map