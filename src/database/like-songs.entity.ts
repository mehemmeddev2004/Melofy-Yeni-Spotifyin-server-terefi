import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { SongEntity } from "./song.entity";

@Entity('liked_songs')  
export class LikeSongEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => UserEntity, user => user.likedSongs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => SongEntity, song => song.likedByUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'song_id' })
  song: SongEntity;
}
