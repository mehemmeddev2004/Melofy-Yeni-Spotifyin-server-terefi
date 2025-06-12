import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ImageEntity } from "./Image.entity";

@Entity('Profiles')
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    displayName: string

    @Column({nullable: true})
    bio: string

    @Column()
    userId: number

    @OneToOne(() => UserEntity, (user) => user.profile, {onDelete: 'CASCADE'})
    user: UserEntity

    @Column({ default: 0 })
    follower: number;

    @Column({ default: 0 })
    following: number;

    @OneToOne(() => ImageEntity, (image) => image.profile)
    @JoinColumn()
    profileImage?: ImageEntity
}