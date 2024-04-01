import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService
  ) { }

  async create(createWishlistDto: CreateWishlistDto, user: User) {
    const { itemsId } = createWishlistDto;
    const wishes = itemsId.map((item) => {
      return this.wishesService.findOne(item)
    })

    return await Promise.all(wishes).then((items) => {
      const wishlist = this.wishlistRepository.create({
        ...createWishlistDto,
        owner: user,
        items
      })
      return this.wishlistRepository.save(wishlist)
    })
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: ['owner', 'items']
    })
  }

  async findOne(id: number): Promise<Wishlist> {
    const wishlist  = this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items']
    })
    if(!wishlist) {
      throw new NotFoundException('Вишлиста нет')
    }
    return wishlist
  }


  async removeOne(id: number, user: User) {
    const wishlist = await this.findOne(id)
    if (!wishlist) {
      throw new NotFoundException('Вишлиста нет')
    }
    if(user.id !== wishlist.owner.id) {
      throw new ForbiddenException('Это не ваш вишлист')
    }
    await this.wishlistRepository.delete(id)
    return wishlist
  }
}
