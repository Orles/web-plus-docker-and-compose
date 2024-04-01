import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateWishlistDto {
    @IsString()
    name: string;

    @IsUrl()
    image: string;

    @IsOptional()
    description: string;

    @IsArray()
    itemsId?: number[]
}