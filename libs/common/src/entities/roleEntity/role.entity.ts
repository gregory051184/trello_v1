import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @CreateDateColumn({name: 'created_at', type: "timestamp"})
    createAt: string;

    @UpdateDateColumn({name: 'updated_at', type: "timestamp"})
    updatedAt: string;

}