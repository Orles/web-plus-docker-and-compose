import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
    constructor(
        @InjectRepository(Wish)
        private wishesRepository: Repository<Wish>,
    ) { }

    async create(createWishDto: CreateWishDto, owner: number): Promise<Wish> {
        const wish = this.wishesRepository.create({
            ...createWishDto,
            owner: {
                id: owner
            }
        })
        return this.wishesRepository.save(wish)
    }

    async findOne(id: number): Promise<Wish> {
        return await this.wishesRepository.findOne({
            where: {id},
            relations: {
                owner: true,
                offers: true
            }
        })
    }

    async findMany(ids: number[]): Promise<Wish[]> {
        return this.wishesRepository.find({
            where: { id: In(ids) }
        })
    }

    async updateOne(id: number, updateUserDto: UpdateWishDto, userId: number) {
        const wish = await this.findOne(id)
        if (!wish) {
            throw new NotFoundException('Нет подарка')
        }
        if (wish.owner.id !== userId) {
            throw new ForbiddenException('Это чужой подарок')
        }
        if (wish.raised && updateUserDto.price > 0) {
            throw new BadRequestException('Кто то уже скинулся на этот подарок, его нельзя изменить')
        }
        return this.wishesRepository.update(id, updateUserDto)
    }

    async removeOne(id: number, userId: number) {
        const wish = await this.findOne(id);
        if (!wish) {
            throw new NotFoundException('Нет подарка')
        }
        if (wish.owner.id !== userId) {
            throw new ForbiddenException('Это чужой подарок')
        }
        return this.wishesRepository.delete(id)
    }

    async findLast(): Promise<Wish[]> {
        return this.wishesRepository.find({
            order: {
                createdAt: 'DESC'
            },
            take: 40,
        })
    }

    async findTop(): Promise<Wish[]> {
        return this.wishesRepository.find({
            order: {
                copied: 'DESC'
            },
            take: 10
        })
    }

    async copy(id: number, userId: number): Promise<Wish> {
        const wish = await this.findOne(id);
        if (!wish) {
            throw new NotFoundException('Нет подарка')
        }
        if (userId === wish.owner.id) {
            throw new BadRequestException('Это ваш подарок')
        }
        const { name, link, image, price, description } = wish
        const copyWish = {
            name, link, image, price, description,
            owner:{
                id: userId
            }
        }
        await this.wishesRepository.update(id, { copied: ++wish.copied })
        return this.create(copyWish, userId)
    }
}