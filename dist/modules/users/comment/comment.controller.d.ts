import { CommentService } from "./comment.service";
import { CreateCommentDto, ReplyCommentDto, UpdateCommentDto } from "./validations/comment.dto";
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    list(): Promise<import("../../../database/Comment.entity").CommentEntity[]>;
    findById(id: number): Promise<import("../../../database/Comment.entity").CommentEntity>;
    create(body: CreateCommentDto, songId: number): Promise<import("../../../database/Comment.entity").CommentEntity>;
    update(id: number, body: UpdateCommentDto): Promise<{
        result: {
            text: string;
            id: number;
            content: string;
            user: import("../../../database/user.entity").UserEntity;
            song: import("../../../database/song.entity").SongEntity;
            likedBy: import("../../../database/user.entity").UserEntity[];
            dislikedBy: import("../../../database/user.entity").UserEntity[];
            parentCommentId: number | null;
            createdAt: Date;
            updateAt: Date;
        };
        message: string;
    }>;
    delete(id: number): Promise<{
        result: import("../../../database/Comment.entity").CommentEntity;
        message: string;
    }>;
    like(id: number): Promise<{
        message: string;
    }>;
    dislike(id: number): Promise<{
        message: string;
    }>;
    reply(body: ReplyCommentDto, commentId: number, songId: number): Promise<import("../../../database/Comment.entity").CommentEntity>;
}
