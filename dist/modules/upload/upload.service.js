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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const upload_entity_1 = require("../../database/upload.entity");
const cloudinary_service_1 = require("../../shared/libs/Cloudinary/cloudinary.service");
const typeorm_2 = require("typeorm");
let UploadService = class UploadService {
    cloudinaryService;
    dataSource;
    uploadRepo;
    constructor(cloudinaryService, dataSource) {
        this.cloudinaryService = cloudinaryService;
        this.dataSource = dataSource;
        this.uploadRepo = this.dataSource.getRepository(upload_entity_1.UploadEntity);
    }
    async uploadImage(image) {
        if (!image)
            throw new common_1.BadRequestException('No image file provided');
        const imageResult = await this.cloudinaryService.uploadFile(image);
        if (!imageResult?.url)
            throw new common_1.BadRequestException('Image upload failed');
        const upload = this.uploadRepo.create({ imageUrl: imageResult.url });
        await this.uploadRepo.save(upload);
        return { id: upload.id, imageUrl: imageResult.url };
    }
    async uploadSong(song) {
        if (!song)
            throw new common_1.BadRequestException('No song file provided');
        const songResult = await this.cloudinaryService.uploadFile(song);
        if (!songResult?.url)
            throw new common_1.BadRequestException('Song upload failed');
        const upload = this.uploadRepo.create({ songUrl: songResult.url });
        await this.uploadRepo.save(upload);
        return { id: upload.id, songUrl: songResult.url };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        typeorm_2.DataSource])
], UploadService);
//# sourceMappingURL=upload.service.js.map