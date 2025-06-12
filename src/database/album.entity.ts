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

import { SongEntity } from "./song.entity"
import { CategoryEntity } from "./category.entity"
import { UserEntity } from "./user.entity"
import { ArtistEntity } from "./artists.entity"


export enum AlbumType {
  ALBUM = "album",
  EP = "ep",
  SINGLE = "single",
  COMPILATION = "compilation",
}

@Entity("albums")
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ nullable: true })
  coverImageUrl: string

  @Column({ type: "date" })
  releaseDate: Date

  @Column({
    type: "enum",
    enum: AlbumType,
    default: AlbumType.ALBUM,
  })
  type: AlbumType

  @Column({ default: 0 })
  totalTracks: number

  @Column({ default: 0 })
  duration: number 

  @Column({ default: 0 })
  playCount: number

  @Column({ nullable: true })
  recordLabel: string

  @Column({ nullable: true })
  producer: string


  @ManyToOne(
    () => ArtistEntity,
    (artist) => artist.albums,
      { nullable: true } // 🔥 Burası önemli
  )
  primaryArtist: ArtistEntity


  @ManyToMany(
    () => ArtistEntity,
    (artist) => artist.featuredAlbums,
      { nullable: true } // 🔥 Burası önemli
  )
  @JoinTable({
    name: "album_featured_artists",
    joinColumn: { name: "album_id" },
    inverseJoinColumn: { name: "artist_id" },
  })
  featuredArtists: ArtistEntity[]

  @OneToMany(
    () => SongEntity,
    (song) => song.album,
  )
  songs: SongEntity[]


  @ManyToOne(
    () => CategoryEntity,
    (category) => category.albums,
  )
  category: CategoryEntity


  @ManyToMany(
    () => UserEntity,
    (user) => user.likedAlbums,
  )
  likedByUsers: UserEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
