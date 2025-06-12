import { CommentEntity } from 'src/database/Comment.entity';
import { DataSource } from 'typeorm';
import { CreateCommentDto, ReplyCommentDto, UpdateCommentDto } from './validations/comment.dto';
import { ClsService } from 'nestjs-cls';
import { SongEntity } from 'src/database/song.entity';
import { UserEntity } from 'src/database/user.entity';
export declare class CommentService {
    private dataSource;
    private readonly cls;
    private songRepo;
    private commentRepo;
    constructor(dataSource: DataSource, cls: ClsService);
    list(): Promise<CommentEntity[]>;
    findById(id: number): Promise<CommentEntity>;
    create(params: CreateCommentDto, songId: number): Promise<CommentEntity>;
    reply(params: ReplyCommentDto, commentId: number, songId: number): Promise<CommentEntity>;
    like(id: number): Promise<{
        message: string;
    }>;
    dislike(id: number): Promise<{
        message: string;
    }>;
    update(params: UpdateCommentDto, id: number): Promise<{
        result: {
            text: string;
            id: number;
            content: string;
            user: UserEntity;
            song: SongEntity;
            likedBy: UserEntity[];
            dislikedBy: UserEntity[];
            parentCommentId: number | null;
            createdAt: Date;
            updateAt: Date;
        };
        message: string;
    }>;
    delete(id: number): Promise<{
        result: CommentEntity;
        message: string;
    }>;
}
