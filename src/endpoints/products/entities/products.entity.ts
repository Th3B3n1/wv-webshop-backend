import { Cart } from "src/endpoints/cart/entities/cart.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({ type: 'bytea', nullable: true })
    image: Blob;

    @OneToMany(() => Cart, cart => cart.product)
    carts: Cart[];
}
