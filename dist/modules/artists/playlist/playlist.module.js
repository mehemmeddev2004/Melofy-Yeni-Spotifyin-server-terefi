"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const playlist_entity_1 = require("../../../database/playlist.entity");
const playlist_service_1 = require("./playlist.service");
const playlist_controller_1 = require("./playlist.controller");
const user_module_1 = require("../../users/user.module");
let PlaylistModule = class PlaylistModule {
};
exports.PlaylistModule = PlaylistModule;
exports.PlaylistModule = PlaylistModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([playlist_entity_1.PlaylistEntity]), user_module_1.UserModule],
        providers: [playlist_service_1.PlaylistService],
        controllers: [playlist_controller_1.PlaylistController]
    })
], PlaylistModule);
//# sourceMappingURL=playlist.module.js.map