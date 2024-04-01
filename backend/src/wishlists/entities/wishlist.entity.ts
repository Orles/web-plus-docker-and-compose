import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsNotEmpty, IsUrl, MaxLength } from 'class-validator';

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ length: 250 })
    @IsNotEmpty()
    name: string;

    @Column({default: '', length: 1500 })
    @MaxLength(1500)
    description: string;

    @Column()
    @IsUrl()
    @IsNotEmpty()
    image: string;

    @ManyToMany(() => Wish)
    @JoinTable()
    @IsNotEmpty()
    items: Wish[];

    @ManyToOne(() => User, user => user.wishlists)
    @IsNotEmpty()
    owner: User;
}