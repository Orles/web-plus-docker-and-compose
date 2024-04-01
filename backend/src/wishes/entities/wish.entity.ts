import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { IsNotEmpty, IsUrl, IsDecimal, MinLength, MaxLength } from 'class-validator';

@Entity()
export class Wish {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ length: 250 })
    @IsNotEmpty()
    name: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    link: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    image: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsDecimal()
    price: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    @IsDecimal()
    raised: number;

    @ManyToOne(() => User, user => user.wishes)
    @IsNotEmpty()
    owner: User;

    @Column({ length: 1024 })
    @IsNotEmpty()
    @MaxLength(1024)
    description: string;

    @OneToMany(() => Offer, offer => offer.item)
    offers: Offer[];

    @Column({ default: 0 })
    @IsDecimal()
    copied: number;

    @ManyToMany(() => Wishlist, wishlist => wishlist.items)
    wishlist: Wishlist[]
}