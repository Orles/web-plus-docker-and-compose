import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer)
        private offersRepository: Repository<Offer>,
        private whishesService: WishesService
    ) { }

    async create(user: User, createOfferDto: CreateOfferDto) {
        const wish = await this.whishesService.findOne(createOfferDto.itemId)
        const total = Number(wish.raised) + createOfferDto.amount
        if(!wish) {
            throw new NotFoundException('Нет такого подарка')
        }
        if(wish.owner.id === user.id) {
            throw new ForbiddenException('Это ваш подарок')
        }
        if(wish.price - wish.raised < createOfferDto.amount) {
            throw new ForbiddenException('Сумма превишает остаток суммы, которую надо скинуть')
        }
        await this.whishesService.updateOne(
            wish.id,
            { raised: total },
            wish.owner.id
        )
        wish.raised = Number(+wish.raised) + createOfferDto.amount
        return await this.offersRepository.save({
            ...createOfferDto,
            item: wish,
            user
        })
    }

    async findAll() {
        const offer = await this.offersRepository.find({
            relations: {user: true, item: true}
        })
       if(offer.length === 0) {
        throw new NotFoundException('Еще никто не скинулся')
       }
       return offer
    }

    findById(id: number) {
        const offer = this.offersRepository.findOne({
            where: {id},
            relations: ['user', 'item']
        })
        if(!offer) {
            throw new NotFoundException('Нет')
        }
        return offer
    }
}