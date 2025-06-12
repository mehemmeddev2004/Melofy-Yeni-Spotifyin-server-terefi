import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

import { AlbumEntity } from "./album.entity"
import { UserEntity } from "./user.entity"
import { PlaylistEntity } from "./playlist.entity"
import { ArtistEntity } from "./artists.entity"
import { RadioStationEntity } from "./radio-session.entity"
import { CommentEntity } from "./Comment.entity"


@Entity("songs")
export class SongEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: true })
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  

  @Column({ nullable: true })
  coverImageUrl: string

  @Column({ default: 0 })
  duration: number 

  @Column({ default: 0 })
  playCount: number

  @Column({ nullable: true })
  trackNumber: number

  @Column({ nullable: true })
  discNumber: number

  @Column({ type: "text", nullable: true })
  lyrics: string

  @Column({ default: true })
  isExplicit: boolean

  @Column({ default: true })
  isPublic: boolean

  @Column({ nullable: false, default: '' })
  audioUrl: string

  @Column({ nullable: true })
  previewUrl: string


  @ManyToMany(
    () => ArtistEntity,
    (artist) => artist.songs,
  )
  @JoinTable({
    name: "song_artists",
    joinColumn: { name: "song_id" },
    inverseJoinColumn: { name: "artist_id" },
  })
  artists: ArtistEntity[]

  @ManyToOne(
    () => AlbumEntity,
    (album) => album.songs,
    { nullable: true },
  )
  album: AlbumEntity

  @OneToMany(() => CommentEntity, (comment) => comment.song)
  comment: CommentEntity

  @ManyToMany(
    () => UserEntity,
    (user) => user.likedSongs,
  )
  likedByUsers: UserEntity[]


  @ManyToMany(
    () => PlaylistEntity,
    (playlist) => playlist.songs,
  )
  playlists: PlaylistEntity[]


  @ManyToMany(
    () => RadioStationEntity,
    (station) => station.songs,
  )
  radioStations: RadioStationEntity[]


  @ManyToOne(
    () => UserEntity,
    (user) => user.uploadedSongs,
  )
  uploadedBy: UserEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
