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
exports.RadioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const radio_session_entity_1 = require("../../../../database/radio-session.entity");
const typeorm_2 = require("typeorm");
let RadioService = class RadioService {
    dataSoruce;
    radioRepo;
    constructor(dataSoruce) {
        this.dataSoruce = dataSoruce;
        this.radioRepo = this.dataSoruce.getRepository(radio_session_entity_1.RadioStationEntity);
    }
    list() {
        let result = this.radioRepo.find({
            relations: ['songs', 'followers', 'creator']
        });
        return result;
    }
    findById(id) {
        let result = this.radioRepo.findOne({ where: { id } });
        return result;
    }
    async create(params) {
        const { name, description, imageUrl, type, listenerCount, totalPlays } = params;
        const existing = await this.radioRepo.findOne({ where: { name } });
        if (existing) {
            throw new common_1.BadRequestException('Bu isimde bir radyo zaten mevcut.');
        }
        const newRadio = this.radioRepo.create({
            name,
            description,
            imageUrl,
            type,
            listenerCount,
            totalPlays
        });
        return await this.radioRepo.save(newRadio);
    }
    async update(params, id) {
        const result = await this.radioRepo.findOne({ where: { id } });
        if (!result)
            throw new common_1.NotFoundException("ID bulunamadı");
        await this.radioRepo.update(id, params);
        return await this.radioRepo.findOne({ where: { id } });
    }
    async delete(id) {
        let result = await this.radioRepo.delete({ id });
        if (!result)
            throw new common_1.NotFoundException("ID is not found");
        await this.radioRepo.delete(id);
        return {
            message: "id deleted succesfully",
            result
        };
    }
};
exports.RadioService = RadioService;
exports.RadioService = RadioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], RadioService);
//# sourceMappingURL=radio.service.js.map