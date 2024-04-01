import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 30)
    username: string;

    @IsOptional()
    @IsString()
    @Length(2, 200)
    about: string;

    @IsOptional()
    @IsUrl()
    avatar: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}