import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { SongEntity } from "./song.entity";

@Entity('Comment_Entity')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string


  @ManyToOne(() => UserEntity, (users) => users.comment)
  user: UserEntity

  @ManyToOne(() => SongEntity, (song) => song)
  song: SongEntity

  @ManyToMany(() => UserEntity)
  @JoinTable()
  likedBy: UserEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  dislikedBy: UserEntity[];

  @Column({ type: 'int', nullable: true })
  parentCommentId: number | null;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updateAt: Date
}