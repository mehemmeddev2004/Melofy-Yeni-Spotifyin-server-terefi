import { UserEntity } from "./user.entity";
import { SongEntity } from "./song.entity";
export declare class CommentEntity {
    id: number;
    content: string;
    user: UserEntity;
    song: SongEntity;
    likedBy: UserEntity[];
    dislikedBy: UserEntity[];
    parentCommentId: number | null;
    text: string;
    createdAt: Date;
    updateAt: Date;
}
