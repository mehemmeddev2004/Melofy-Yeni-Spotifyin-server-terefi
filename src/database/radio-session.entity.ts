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
import { SongEntity } from "./song.entity"
import { UserEntity } from "./user.entity"
import { CategoryEntity } from "./category.entity"

export enum RadioType {
  GENRE = "genre",
  ARTIST = "artist",
  MOOD = "mood",
  DECADE = "decade",
  CUSTOM = "custom",
}

@Entity("radio_stations")
export class RadioStationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ nullable: true })
  imageUrl: string

  @Column({
    type: "enum",
    enum: RadioType,
    default: RadioType.CUSTOM,
  })
  type: RadioType

  @Column({ default: true })
  isActive: boolean

  @Column({ default: 0 })
  listenerCount: number

  @Column({ default: 0 })
  totalPlays: number


  @ManyToMany(
    () => SongEntity,
    (song) => song.radioStations,
  )
  @JoinTable({
    name: "radio_station_songs",
    joinColumn: { name: "station_id" },
    inverseJoinColumn: { name: "song_id" },
  })
  songs: SongEntity[]

  @ManyToMany(
    () => UserEntity,
    (user) => user.followedRadioStations,
  )
  followers: UserEntity[]

 
  @ManyToOne(
    () => UserEntity,
    (user) => user.createdRadioStations,
    { nullable: true },
  )
  creator: UserEntity


  @ManyToOne(() => CategoryEntity, { nullable: true })
  category: CategoryEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
