import { Body, Controller, Post, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
        return this.offersService.create(req.user, createOfferDto)
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.offersService.findAll()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findById(@Param('id') id: number) {
        return this.offersService.findById(id)
    }
}
