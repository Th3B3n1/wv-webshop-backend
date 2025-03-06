import { Tokens } from "src/auth/entities/tokens.entity";
import { Cart } from "src/endpoints/cart/entities/cart.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({ default: false })
    isAdmin: boolean;

    @Column()
    password: string;

    @OneToMany(() => Cart, cart => cart.user)
    carts: Cart[];

    @OneToMany(() => Tokens, token => token.user)
    tokens: Tokens[];
}
