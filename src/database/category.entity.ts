import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm"

import { AlbumEntity } from "./album.entity"
import { ArtistEntity } from "./artists.entity"

@Entity("categories")
export class CategoryEntity  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

 

  @Column({ nullable: true })
  imageUrl: string

  @Column({ nullable: true })
  parentId: number | null

  @ManyToOne(
    () => CategoryEntity,
    (category) => category.children,
    {
      nullable: true,
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({ name: "parentId" })
  parent: CategoryEntity

  @OneToMany(
    () => CategoryEntity,
    (category) => category.parent,
  )
  children: CategoryEntity[]

  @OneToMany(
    () => ArtistEntity,
    (artist) => artist.category,
  )
  artists: ArtistEntity[]

  @OneToMany(
    () => AlbumEntity,
    (album) => album.category,
  )
  albums: AlbumEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
