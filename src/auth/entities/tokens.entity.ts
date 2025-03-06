import { Users } from "src/endpoints/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tokens')
export class Tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({ default: new Date() })
    expiresAt: Date;

    @ManyToOne(() => Users, user => user.tokens)
    @JoinColumn({ name: 'user_id' })
    user: Users;
}