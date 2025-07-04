"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const artists_entity_1 = require("../../../database/artists.entity");
const song_entity_1 = require("../../../database/song.entity");
const song_controller_1 = require("./song.controller");
const song_service_1 = require("./song.service");
const user_module_1 = require("../../users/user.module");
let SongModule = class SongModule {
};
exports.SongModule = SongModule;
exports.SongModule = SongModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([song_entity_1.SongEntity, artists_entity_1.ArtistEntity]), user_module_1.UserModule],
        controllers: [song_controller_1.SongController],
        providers: [song_service_1.SongService]
    })
], SongModule);
//# sourceMappingURL=song.module.js.map