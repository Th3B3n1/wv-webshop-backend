import { IsString, IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
