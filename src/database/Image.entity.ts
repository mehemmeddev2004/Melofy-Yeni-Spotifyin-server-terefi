
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity"
import { ArtistEntity } from "./artists.entity"

@Entity('Images')
export class ImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @OneToOne(() => ProfileEntity, (profile) => profile.profileImage)
    profile: ProfileEntity

    @OneToOne(() => ArtistEntity, (artist) => artist.artistImage)
    artist: ArtistEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}