import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { WishesService } from './wishes.service';
import { Wish } from './entities/wish.entity';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
    constructor(
        private wishesService: WishesService
    ) { }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createWishDto: CreateWishDto, @Req() req): Promise<Wish> {
        return this.wishesService.create(createWishDto, req.user.id)
    }

    @Get('last')
    async findLast(): Promise<Wish[]> {
        return await this.wishesService.findLast()
    }

    @Get('top')
    async findTop(): Promise<Wish[]> {
        return await this.wishesService.findTop()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number): Promise<Wish> {
        return this.wishesService.findOne(id)
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateOne(@Param('id') id: number, @Req() req, @Body() updateWishDto: UpdateWishDto) {
        return this.wishesService.updateOne(id, updateWishDto, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async removeOne(@Param('id') id: number, @Req() req) {
        return this.wishesService.removeOne(id, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Post(':id/copy')
    async copy(@Param('id') id: number, @Req() req) {
        return this.wishesService.copy(id, req.user.id)
    }
}
