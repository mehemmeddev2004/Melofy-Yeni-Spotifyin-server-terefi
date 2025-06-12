import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { UserEntity } from './user.entity';
  
  @Entity('images')
  export class UploadEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    imageUrl: string;

    @Column()
    songUrl: string;

  
    @OneToOne(() => UserEntity, (user) => user.upload)
    user: UserEntity;
    
    
    @Column({ nullable: true })
    type: 'image' | 'audio';
    
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }