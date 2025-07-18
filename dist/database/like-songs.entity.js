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
exports.LikeSongEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const song_entity_1 = require("./song.entity");
let LikeSongEntity = class LikeSongEntity {
    id;
    user;
    song;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, user: { required: true, type: () => require("./user.entity").UserEntity }, song: { required: true, type: () => require("./song.entity").SongEntity } };
    }
};
exports.LikeSongEntity = LikeSongEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LikeSongEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.likedSongs, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], LikeSongEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => song_entity_1.SongEntity, song => song.likedByUsers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'song_id' }),
    __metadata("design:type", song_entity_1.SongEntity)
], LikeSongEntity.prototype, "song", void 0);
exports.LikeSongEntity = LikeSongEntity = __decorate([
    (0, typeorm_1.Entity)('liked_songs')
], LikeSongEntity);
//# sourceMappingURL=like-songs.entity.js.map