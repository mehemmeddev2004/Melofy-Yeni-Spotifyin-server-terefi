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
exports.CommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const Auth_guard_1 = require("../../../guards/Auth.guard");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("./validations/comment.dto");
const swagger_1 = require("@nestjs/swagger");
let CommentController = class CommentController {
    commentService;
    constructor(commentService) {
        this.commentService = commentService;
    }
    list() {
        return this.commentService.list();
    }
    findById(id) {
        return this.commentService.findById(id);
    }
    create(body, songId) {
        return this.commentService.create(body, songId);
    }
    update(id, body) {
        return this.commentService.update(body, id);
    }
    delete(id) {
        return this.commentService.delete(id);
    }
    like(id) {
        return this.commentService.like(id);
    }
    dislike(id) {
        return this.commentService.dislike(id);
    }
    reply(body, commentId, songId) {
        return this.commentService.reply(body, commentId, songId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../../database/Comment.entity").CommentEntity] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../../database/Comment.entity").CommentEntity }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':id/songId'),
    (0, common_1.UseGuards)(Auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    openapi.ApiResponse({ status: 201, type: require("../../../database/Comment.entity").CommentEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('songId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CreateCommentDto, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "like", null);
__decorate([
    (0, common_1.Post)(':id/dislike'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "dislike", null);
__decorate([
    (0, common_1.Post)(':commentId/:songId/reply'),
    openapi.ApiResponse({ status: 201, type: require("../../../database/Comment.entity").CommentEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Param)('songId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.ReplyCommentDto, Number, Number]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "reply", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map