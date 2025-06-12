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
exports.ProfileEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const Image_entity_1 = require("./Image.entity");
let ProfileEntity = class ProfileEntity extends typeorm_1.BaseEntity {
    id;
    displayName;
    bio;
    userId;
    user;
    follower;
    following;
    profileImage;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, displayName: { required: true, type: () => String }, bio: { required: true, type: () => String }, userId: { required: true, type: () => Number }, user: { required: true, type: () => require("./user.entity").UserEntity }, follower: { required: true, type: () => Number }, following: { required: true, type: () => Number }, profileImage: { required: false, type: () => require("./Image.entity").ImageEntity } };
    }
};
exports.ProfileEntity = ProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.profile, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.UserEntity)
], ProfileEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "follower", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], ProfileEntity.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Image_entity_1.ImageEntity, (image) => image.profile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Image_entity_1.ImageEntity)
], ProfileEntity.prototype, "profileImage", void 0);
exports.ProfileEntity = ProfileEntity = __decorate([
    (0, typeorm_1.Entity)('Profiles')
], ProfileEntity);
//# sourceMappingURL=profile.entity.js.map