import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "@app/common";
import {JoinColumn} from "typeorm";

@Entity('tokens')
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'refresh_token'})
    refreshToken: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: string;

    @OneToOne(() => User, {cascade: true})
    @JoinColumn()
    user: User;

}