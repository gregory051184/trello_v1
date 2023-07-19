import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'username', nullable: false})
    userName: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: string;

    @Column({name: 'role_id', nullable: true})
    roleId: number;
}