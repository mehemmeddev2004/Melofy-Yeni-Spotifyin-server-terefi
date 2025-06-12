import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { CategoryEntity } from "./category.entity"
import { SongEntity } from "./song.entity"
import { AlbumEntity } from "./album.entity"
import { UserEntity } from "./user.entity"
import { ImageEntity } from "./Image.entity"


@Entity("artists")
export class ArtistEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  imageUrl: string

  @Column({ type: "text", nullable: true })
  bio: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  website: string

  @Column({ default: 0 })
  followerCount: number

  @Column({ default: 0 })
  monthlyListeners: number

  @Column({ default: true })
  isVerified: boolean

  @ManyToMany(
    () => SongEntity,
    (song) => song.artists,
  )
  songs: SongEntity[]

 
  @OneToMany(
    () => AlbumEntity,
    (album) => album.primaryArtist,
  )
  albums: AlbumEntity[]

  

  @ManyToMany(
    () => AlbumEntity,
    (album) => album.featuredArtists,
      { nullable: true } 
  )
  featuredAlbums: AlbumEntity[]



    @OneToOne(() => ImageEntity, (image) => image.artist, {nullable: true})
    @JoinColumn()
    artistImage?: ImageEntity
    
  @ManyToMany(
    () => UserEntity,
    (user) => user.followedArtists,
  )
  followers: UserEntity[]

@ManyToOne(
  () => CategoryEntity,
  (category) => category.artists,
  { nullable: true, onDelete: "SET NULL" } 
)
category: CategoryEntity

@ManyToOne(() => ArtistEntity, artist => artist.children)
parent: ArtistEntity;

@OneToMany(() => ArtistEntity, artist => artist.parent)
children: ArtistEntity[];


  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
