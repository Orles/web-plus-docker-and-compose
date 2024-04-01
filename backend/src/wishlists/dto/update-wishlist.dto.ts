import { PartialType } from "@nestjs/mapped-types";
import { CreateWishDto } from "src/wishes/dto/create-wish.dto";

export class UpdateWishlistDto extends PartialType(CreateWishDto) {
}