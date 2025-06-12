import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { UserEntity } from "./user.entity"
import { SongEntity } from "./song.entity"

@Entity("playlists")
export class PlaylistEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ nullable: true })
  coverImageUrl: string

  @Column({ default: true })
  isPublic: boolean

  @Column({ default: false })
  isCollaborative: boolean

  @Column({ default: 0 })
  playCount: number

  @Column({ default: 0 })
  followerCount: number

  @Column({ default: 0 })
  totalDuration: number 

  
  @ManyToOne(
    () => UserEntity,
    (user) => user.playlists,
  )
  owner: UserEntity


  @ManyToMany(
    () => SongEntity,
    (song) => song.playlists,
  )
  @JoinTable({
    name: "playlist_songs",
    joinColumn: { name: "playlist_id" },
    inverseJoinColumn: {
      name: "song_id",
      referencedColumnName: "id"
    }
  })
  songs: SongEntity[]



  @ManyToMany(
    () => UserEntity,
    (user) => user.likedPlaylists,
  )
  likedByUsers: UserEntity[]

  @ManyToMany(
    () => UserEntity,
    (user) => user.followedPlaylists,
  )
  followedByUsers: UserEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
