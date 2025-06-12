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
exports.SongController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const song_service_1 = require("./song.service");
const create_song_dto_1 = require("./validations/create-song.dto");
const update_song_dto_1 = require("./validations/update-song.dto");
const swagger_1 = require("@nestjs/swagger");
const Auth_guard_1 = require("../../../guards/Auth.guard");
let SongController = class SongController {
    songService;
    constructor(songService) {
        this.songService = songService;
    }
    list() {
        return this.songService.list();
    }
    findById(id) {
        return this.songService.findById(id);
    }
    create(body) {
        return this.songService.create(body);
    }
    update(body, id) {
        return this.songService.update(body, id);
    }
    delete(id) {
        return this.songService.delete(id);
    }
    startMusic(id) {
        return this.songService.startMusic(id);
    }
    nextMusic() {
        return this.songService.nextMusic();
    }
    prevMusic() {
        return this.songService.prevMusic();
    }
    stopMusic() {
        return this.songService.stopMusic();
    }
};
exports.SongController = SongController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/song.entity").SongEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_song_dto_1.CreateSongDto]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_song_dto_1.UpdateSongDto, Number]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "startMusic", null);
__decorate([
    (0, common_1.Post)('next'),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "nextMusic", null);
__decorate([
    (0, common_1.Post)('prev'),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "prevMusic", null);
__decorate([
    (0, common_1.Post)('stop'),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "stopMusic", null);
exports.SongController = SongController = __decorate([
    (0, common_1.Controller)('song'),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongController);
//# sourceMappingURL=song.controller.js.map