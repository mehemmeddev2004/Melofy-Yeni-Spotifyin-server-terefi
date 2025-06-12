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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Comment_entity_1 = require("../../../database/Comment.entity");
const typeorm_2 = require("typeorm");
const nestjs_cls_1 = require("nestjs-cls");
const song_entity_1 = require("../../../database/song.entity");
let CommentService = class CommentService {
    dataSource;
    cls;
    songRepo;
    commentRepo;
    constructor(dataSource, cls) {
        this.dataSource = dataSource;
        this.cls = cls;
        this.songRepo = this.dataSource.getRepository(song_entity_1.SongEntity);
        this.commentRepo = this.dataSource.getRepository(Comment_entity_1.CommentEntity);
    }
    async list() {
        try {
            return await this.commentRepo.find({
                relations: ['user', 'song'],
                order: { createdAt: 'DESC' },
            });
        }
        catch (err) {
            console.error('List error:', err);
            throw new common_1.BadRequestException('comment is not lis');
        }
    }
    async findById(id) {
        try {
            const result = await this.commentRepo.findOne({
                where: { id },
                relations: ['user', 'song'],
            });
            if (!result)
                throw new common_1.NotFoundException('id is not found');
            return result;
        }
        catch (err) {
            console.error('Find error:', err);
            throw err;
        }
    }
    async create(params, songId) {
        try {
            let user = this.cls.get('user');
            const song = await this.songRepo.findOne({ where: { id: songId } });
            if (!song)
                throw new common_1.NotFoundException('song is not found');
            const comment = this.commentRepo.create({
                content: params.content,
                text: params.content,
                parentCommentId: null,
                song: { id: songId },
                user: { id: user.id },
            });
            return await this.commentRepo.save(comment);
        }
        catch (err) {
            console.error('Create error:', err);
            throw new common_1.BadRequestException('error create Comment');
        }
    }
    async reply(params, commentId, songId) {
        const user = this.cls.get('user');
        const song = await this.songRepo.findOne({ where: { id: songId } });
        if (!song)
            throw new common_1.NotFoundException('song not found');
        const parentComment = await this.commentRepo.findOne({ where: { id: commentId } });
        if (!parentComment)
            throw new common_1.NotFoundException('parent comment not found');
        const replyComment = this.commentRepo.create({
            text: params.content,
            song: { id: songId },
            user: { id: user.id },
            parentCommentId: parentComment.id,
        });
        return await this.commentRepo.save(replyComment);
    }
    async like(id) {
        let user = this.cls.get('user');
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ['likedBy', 'dislikedBy'],
        });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        comment.dislikedBy = comment.dislikedBy.filter(u => u.id !== user.id);
        const alreadyLiked = comment.likedBy.some(u => u.id === user.id);
        if (alreadyLiked) {
            comment.likedBy = comment.likedBy.filter(u => u.id !== user.id);
        }
        else {
            comment.likedBy.push({ id: user.id });
        }
        await this.commentRepo.save(comment);
        return { message: alreadyLiked ? 'Like removed' : 'Liked successfully' };
    }
    async dislike(id) {
        let user = this.cls.get('user');
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ['likedBy', 'dislikedBy'],
        });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        comment.likedBy = comment.likedBy.filter(u => u.id !== user.id);
        const alreadyDisliked = comment.dislikedBy.some(u => u.id === user.id);
        if (alreadyDisliked) {
            comment.dislikedBy = comment.dislikedBy.filter(u => u.id !== user.id);
        }
        else {
            comment.dislikedBy.push({ id: user.id });
        }
        await this.commentRepo.save(comment);
        return { message: alreadyDisliked ? 'Dislike removed' : 'Disliked successfully' };
    }
    async update(params, id) {
        try {
            let user = this.cls.get('user');
            if (!user)
                throw new common_1.UnauthorizedException();
            const result = await this.commentRepo.findOne({ where: { id } });
            if (!result)
                throw new common_1.NotFoundException('Comment id is not found');
            await this.commentRepo.update(id, { text: params.content });
            return {
                result: { ...result, text: params.content },
                message: 'Comment updated succesfully',
            };
        }
        catch (err) {
            console.error('Update error:', err);
            throw new common_1.BadRequestException('Comment cannot updated');
        }
    }
    async delete(id) {
        try {
            let user = this.cls.get('user');
            if (!user)
                throw new common_1.UnauthorizedException();
            const result = await this.commentRepo.findOne({ where: { id } });
            if (!result)
                throw new common_1.NotFoundException('Comment is not found');
            const { affected } = await this.commentRepo.delete(id);
            if (!affected)
                throw new common_1.BadRequestException('Error delete comment');
            return {
                result,
                message: 'Comment deleted succesfully',
            };
        }
        catch (err) {
            console.error('Delete error:', err);
            throw new common_1.BadRequestException('COmment cannot delete');
        }
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        nestjs_cls_1.ClsService])
], CommentService);
//# sourceMappingURL=comment.service.js.map