import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WishesModule } from 'src/wishes/wishes.module';
import { HashModule } from 'src/hash/hash.module';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish]), WishesModule, HashModule],
  controllers: [UsersController],
  providers: [UsersService, WishesService],
  exports: [UsersService],
})
export class UsersModule {}
