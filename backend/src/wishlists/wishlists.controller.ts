import { Body, Controller, Get, Param, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Controller('wishlistlists')
export class WishlistsController {
    constructor(
        private wishlistsService: WishlistsService
    ) { }

    @Post()
    @UseGuards(JwtGuard)
    async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
        try {
            return this.wishlistsService.create(createWishlistDto, req.user)
        } catch (err) {
            console.log(err)
        }
    }

    @Get()
    @UseGuards(JwtGuard)
    async findAll() {
        return this.wishlistsService.findAll()
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number): Promise<Wishlist> {
        return this.wishlistsService.findOne(id)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async removeOne(@Param('id') id: number, @Req() req) {
        return this.wishlistsService.removeOne(id, req.user)
    }
}
