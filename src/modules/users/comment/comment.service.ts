import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { CommentEntity } from 'src/database/Comment.entity';
import { DataSource, Repository } from 'typeorm';
import {
  CreateCommentDto,
  ReplyCommentDto,
  UpdateCommentDto,
} from './validations/comment.dto';
import { ClsService } from 'nestjs-cls';
import { SongEntity } from 'src/database/song.entity';
import { UserEntity } from 'src/database/user.entity';

export class CommentService {
  private songRepo: Repository<SongEntity>;
  private commentRepo: Repository<CommentEntity>;

  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private readonly cls: ClsService,
  ) {
    this.songRepo = this.dataSource.getRepository(SongEntity);
    this.commentRepo = this.dataSource.getRepository(CommentEntity);
  }

  async list() {
    try {
      return await this.commentRepo.find({
        relations: ['user', 'song'],
        order: { createdAt: 'DESC' },
      });
    } catch (err) {
      console.error('List error:', err);
      throw new BadRequestException('comment is not lis');
    }
  }

  async findById(id: number) {
    try {
      const result = await this.commentRepo.findOne({
        where: { id },
        relations: ['user', 'song'],
      });
      if (!result) throw new NotFoundException('id is not found');
      return result;
    } catch (err) {
      console.error('Find error:', err);
      throw err;
    }
  }

  async create(params: CreateCommentDto, songId: number) {
    try {
      let user = this.cls.get<UserEntity>('user');

      const song = await this.songRepo.findOne({ where: { id: songId } });
      if (!song) throw new NotFoundException('song is not found');

      const comment = this.commentRepo.create({
        content: params.content,
        text: params.content,
        parentCommentId: null, // Top-level comment
        song: { id: songId },
        user: { id: user.id },
      });

      return await this.commentRepo.save(comment);
    } catch (err) {
      console.error('Create error:', err);
      throw new BadRequestException('error create Comment');
    }
  }

  async reply(params: ReplyCommentDto, commentId: number, songId: number) {
    const user = this.cls.get<UserEntity>('user');
    const song = await this.songRepo.findOne({ where: { id: songId } });
    if (!song) throw new NotFoundException('song not found');

    const parentComment = await this.commentRepo.findOne({ where: { id: commentId } });
    if (!parentComment) throw new NotFoundException('parent comment not found');

    const replyComment = this.commentRepo.create({
      text: params.content,
      song: { id: songId },
      user: { id: user.id },
      parentCommentId: parentComment.id,
    });

    return await this.commentRepo.save(replyComment);
  }



  async like(id: number) {
    let user = this.cls.get<UserEntity>('user');
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['likedBy', 'dislikedBy'],
    });

    if (!comment) throw new NotFoundException('Comment not found');

    comment.dislikedBy = comment.dislikedBy.filter(u => u.id !== user.id);

    const alreadyLiked = comment.likedBy.some(u => u.id === user.id);
    if (alreadyLiked) {

      comment.likedBy = comment.likedBy.filter(u => u.id !== user.id);
    } else {
      comment.likedBy.push({ id: user.id } as any);
    }

    await this.commentRepo.save(comment);

    return { message: alreadyLiked ? 'Like removed' : 'Liked successfully' }

  }




  async dislike(id: number) {
    let user = this.cls.get<UserEntity>('user');

    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['likedBy', 'dislikedBy'],
    });

    if (!comment) throw new NotFoundException('Comment not found');


    comment.likedBy = comment.likedBy.filter(u => u.id !== user.id);

    const alreadyDisliked = comment.dislikedBy.some(u => u.id === user.id);
    if (alreadyDisliked) {
      comment.dislikedBy = comment.dislikedBy.filter(u => u.id !== user.id);
    } else {
      comment.dislikedBy.push({ id: user.id } as any);
    }

    await this.commentRepo.save(comment);
    return { message: alreadyDisliked ? 'Dislike removed' : 'Disliked successfully' };
  }





  async update(params: UpdateCommentDto, id: number) {
    try {
      let user = this.cls.get<UserEntity>('user');
      if (!user) throw new UnauthorizedException()
      const result = await this.commentRepo.findOne({ where: { id } });
      if (!result) throw new NotFoundException('Comment id is not found');

      await this.commentRepo.update(id, { text: params.content });

      return {
        result: { ...result, text: params.content },
        message: 'Comment updated succesfully',
      };
    } catch (err) {
      console.error('Update error:', err);
      throw new BadRequestException('Comment cannot updated');
    }
  }

  async delete(id: number) {
    try {
      let user = this.cls.get<UserEntity>('user');
      if (!user) throw new UnauthorizedException()
      const result = await this.commentRepo.findOne({ where: { id } });
      if (!result) throw new NotFoundException('Comment is not found');

      const { affected } = await this.commentRepo.delete(id);
      if (!affected) throw new BadRequestException('Error delete comment');

      return {
        result,
        message: 'Comment deleted succesfully',
      };
    } catch (err) {
      console.error('Delete error:', err);
      throw new BadRequestException('COmment cannot delete');
    }
  }
}
