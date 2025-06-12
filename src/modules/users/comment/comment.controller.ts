import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/Auth.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto, ReplyCommentDto, UpdateCommentDto } from "./validations/comment.dto";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ) { }

    @Get()
    list() {
        return this.commentService.list()
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.commentService.findById(id)
    }

    @Post(':id/songId')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    create(@Body() body: CreateCommentDto, @Param('songId') songId: number) {
        return this.commentService.create(body, songId)
    }
    @Post(':id')
    update(
        @Param('id') id: number,
        @Body() body: UpdateCommentDto
    ) {
        return this.commentService.update(body, id);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number
    ) {
        return this.commentService.delete(id)
    }


    @Post(':id/like')
    like(@Param('id') id: number) {
        return this.commentService.like(id)
    }

    @Post(':id/dislike')
    dislike(@Param('id') id: number) {
        return this.commentService.dislike(id)
    }
    @Post(':commentId/:songId/reply')
    reply(
        @Body() body: ReplyCommentDto,
        @Param('commentId') commentId: number,
        @Param('songId') songId: number,
    ) {
        return this.commentService.reply(body, commentId, songId);
    }



}