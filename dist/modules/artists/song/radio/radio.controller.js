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
exports.RadioController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const radio_service_1 = require("./radio.service");
const create_radio_dto_1 = require("./validations/create-radio.dto");
const update_radio_dto_1 = require("./validations/update-radio.dto");
let RadioController = class RadioController {
    radioService;
    constructor(radioService) {
        this.radioService = radioService;
    }
    async list() {
        return await this.radioService.list();
    }
    async findById(id) {
        return await this.radioService.findById(id);
    }
    async create(dto) {
        return await this.radioService.create(dto);
    }
    async update(id, dto) {
        return await this.radioService.update(dto, id);
    }
    async delete(id) {
        return await this.radioService.delete(id);
    }
};
exports.RadioController = RadioController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tüm radyoları getirir' }),
    openapi.ApiResponse({ status: 200, type: [require("../../../../database/radio-session.entity").RadioStationEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RadioController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ID ile radyo bul' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Radyo bulundu' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RadioController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Yeni radyo oluştur' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Radyo başarıyla oluşturuldu' }),
    openapi.ApiResponse({ status: 201, type: require("../../../../database/radio-session.entity").RadioStationEntity }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_radio_dto_1.CreateRadioDto]),
    __metadata("design:returntype", Promise)
], RadioController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Radyo güncelle' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Radyo başarıyla güncellendi' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_radio_dto_1.UpdateRadioDto]),
    __metadata("design:returntype", Promise)
], RadioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Radyo sil' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Radyo başarıyla silindi' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RadioController.prototype, "delete", null);
exports.RadioController = RadioController = __decorate([
    (0, swagger_1.ApiTags)('Radio'),
    (0, common_1.Controller)('radio'),
    __metadata("design:paramtypes", [radio_service_1.RadioService])
], RadioController);
//# sourceMappingURL=radio.controller.js.map