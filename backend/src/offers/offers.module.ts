import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesModule } from 'src/wishes/wishes.module';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService, WishesService],
  exports: [OffersService]
})
export class OffersModule {}
