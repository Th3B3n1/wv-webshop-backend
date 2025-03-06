import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @Length(3, 50)
    name: string;

    @IsString()
    @Length(3, 128)
    description: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsString()
    @Length(3, 50)
    image: string;
}