
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { UploadEntity } from "./upload.entity"
import { SongEntity } from "./song.entity"

import { AlbumEntity } from "./album.entity"
import { PlaylistEntity } from "./playlist.entity"
import { RadioStationEntity } from "./radio-session.entity"
import { ArtistEntity } from "./artists.entity"

import { ProfileEntity } from "./profile.entity"
import { CommentEntity } from "./Comment.entity"
import { Subscription } from "src/shared/enum/subscriation.enum"
import { SubscriptionPlanEntity } from "./subscription-plan.entity"



@Entity("users")
export class UserEntity {
  @Column({
    type: 'enum',
    enum: Subscription,
    default: Subscription.Basic,
  })
  subscription: Subscription;

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  dateOfBirth: Date

  @Column({ nullable: true })
  country: string

  @OneToOne(() => UploadEntity)
  @JoinColumn({ name: "imageId", referencedColumnName: "id" })
  upload: UploadEntity

  @Column({ nullable: true })
  imageUrl: string


  @OneToMany(
    () => PlaylistEntity,
    (playlist) => playlist.owner,
  )
  playlists: PlaylistEntity[]


  @ManyToMany(
    () => PlaylistEntity,
    (playlist) => playlist.likedByUsers,
  )
  @JoinTable({
    name: "user_liked_playlists",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "playlist_id" },
  })
  likedPlaylists: PlaylistEntity[]

  @ManyToMany(
    () => PlaylistEntity,
    (playlist) => playlist.followedByUsers,
  )
  @JoinTable({
    name: "user_followed_playlists",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "playlist_id" },
  })
  followedPlaylists: PlaylistEntity[]





  @ManyToOne(() => SubscriptionPlanEntity)
  subscriptionPlan: SubscriptionPlanEntity;


  @OneToMany(
    () => SongEntity,
    (song) => song.uploadedBy,
  )
  uploadedSongs: SongEntity[]


  @ManyToMany(
    () => SongEntity,
    (song) => song.likedByUsers,
  )
  @JoinTable({
    name: "user_liked_songs",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "song_id" },
  })
  likedSongs: SongEntity[]


  @ManyToMany(
    () => AlbumEntity,
    (album) => album.likedByUsers,
  )
  @JoinTable({
    name: "user_liked_albums",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "album_id" },
  })
  likedAlbums: AlbumEntity[]


  @ManyToMany(
    () => ArtistEntity,
    (artist) => artist.followers,
  )
  @JoinTable({
    name: "user_followed_artists",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "artist_id" },
  })
  followedArtists: ArtistEntity[]


  @OneToMany(
    () => RadioStationEntity,
    (station) => station.creator,
  )
  createdRadioStations: RadioStationEntity[]

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: CommentEntity


  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  profile: ProfileEntity


  @ManyToMany(
    () => RadioStationEntity,
    (station) => station.followers,
  )
  @JoinTable({
    name: "user_followed_radio_stations",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "station_id" },
  })
  followedRadioStations: RadioStationEntity[]


  @Column({ default: true })
  isActive: boolean


  @Column({ nullable: true })
  lastLoginAt: Date


  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
