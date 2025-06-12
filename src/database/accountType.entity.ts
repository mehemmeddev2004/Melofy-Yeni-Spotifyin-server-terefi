import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Account_type')
export class accountTypeEntity{
@PrimaryGeneratedColumn()
id: number

@Column()
name: string

@Column("text", { array: true })
description: string[];

@Column()
price: string

}