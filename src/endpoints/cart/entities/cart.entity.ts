import { Products } from "src/endpoints/products/entities/products.entity";
import { Users } from "src/endpoints/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Users, user => user.carts)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @ManyToOne(() => Products, product => product.carts)
    @JoinColumn({ name: 'product_id' })
    product: Products;
}
