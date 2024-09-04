import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn() // pk
    id?:number;

    @Column({unique:true})
    email:string;

    @Column({ nullable: true })
    password: string;
  
    @Column()
    username: string;
  
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdDt: Date;
  
    @Column({ nullable: true })
    providerId: string;
}