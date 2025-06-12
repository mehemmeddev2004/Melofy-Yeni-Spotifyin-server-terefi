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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let SubscriptionPlanEntity = class SubscriptionPlanEntity {
    id;
    name;
    canCreatePlaylist;
    canNextSong;
    canSeeLyrics;
    maxSkipsPerDay;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, canCreatePlaylist: { required: true, type: () => Boolean }, canNextSong: { required: true, type: () => Boolean }, canSeeLyrics: { required: true, type: () => Boolean }, maxSkipsPerDay: { required: true, type: () => Number } };
    }
};
exports.SubscriptionPlanEntity = SubscriptionPlanEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubscriptionPlanEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SubscriptionPlanEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SubscriptionPlanEntity.prototype, "canCreatePlaylist", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SubscriptionPlanEntity.prototype, "canNextSong", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SubscriptionPlanEntity.prototype, "canSeeLyrics", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 3 }),
    __metadata("design:type", Number)
], SubscriptionPlanEntity.prototype, "maxSkipsPerDay", void 0);
exports.SubscriptionPlanEntity = SubscriptionPlanEntity = __decorate([
    (0, typeorm_1.Entity)('subscription_plan')
], SubscriptionPlanEntity);
//# sourceMappingURL=subscription-plan.entity.js.map