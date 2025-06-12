import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscription_plan')
export class SubscriptionPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; 

  @Column({ default: false })
  canCreatePlaylist: boolean;

  @Column({ default: false })
  canNextSong: boolean;

  @Column({ default: false })
  canSeeLyrics: boolean;

  @Column({ default: 3 })
  maxSkipsPerDay: number;
}