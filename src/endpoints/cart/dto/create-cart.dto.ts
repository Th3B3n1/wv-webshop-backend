import { Type } from "class-transformer";
import { IsNumber, IsObject, Min } from "class-validator";
import { Products } from "src/endpoints/products/entities/products.entity";

export class CreateCartDto {
    @IsNumber()
    @Min(1)
    quantity: number;

    @Type(() => Products)
    @IsObject()
    product: Products;
}