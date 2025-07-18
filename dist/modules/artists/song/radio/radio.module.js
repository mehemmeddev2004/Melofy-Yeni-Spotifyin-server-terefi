"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.radioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const radio_session_entity_1 = require("../../../../database/radio-session.entity");
const radio_service_1 = require("./radio.service");
const radio_controller_1 = require("./radio.controller");
let radioModule = class radioModule {
};
exports.radioModule = radioModule;
exports.radioModule = radioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([radio_session_entity_1.RadioStationEntity])],
        providers: [radio_service_1.RadioService],
        controllers: [radio_controller_1.RadioController]
    })
], radioModule);
//# sourceMappingURL=radio.module.js.map