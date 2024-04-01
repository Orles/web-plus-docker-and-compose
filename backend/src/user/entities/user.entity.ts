import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    @IsNotEmpty()
    username: string;

    @Column({ length: 200, default: 'Пока ничего не рассказал о себе' })
    about: string;

    @Column({ default: 'https://i.pravatar.cc/300' })
    @IsUrl()
    avatar: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @OneToMany(() => Wish, wish => wish.owner)
    wishes: Wish[];

    @OneToMany(() => Offer, offer => offer.user)
    offers: Offer[];

    @OneToMany(() => Wishlist, wishlist => wishlist.owner)
    wishlists: Wishlist[];
}