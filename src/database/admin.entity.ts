import * as bcrypt from 'bcrypt';
import { AdminProvider, AdminRole } from 'src/shared/enum/admin.enum';


import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UploadEntity } from './upload.entity';

@Entity('Admin_Entity')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  admin: string;
  
  @Column({ unique: true })
  adminname: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;



  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.ADMIN
  })
  role: AdminRole;


  @Column({
    type: 'enum',
    enum: AdminProvider,
    default: AdminProvider.LOCAL,
  })
  provider: AdminProvider;



  @Column({ nullable: true })
  providerId: string;

  @Column({ type: 'boolean', default: false })
  premium: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeUpsert() {
    // Only hash the password if it's not already hashed
    // A bcrypt hash always starts with $2a$, $2b$, or $2y$
    if (!this.password) return;
    if (this.password.startsWith('$2')) return; // Already hashed

    this.password = await bcrypt.hash(this.password, 10);
  }
}
