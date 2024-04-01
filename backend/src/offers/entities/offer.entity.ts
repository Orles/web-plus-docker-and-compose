import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsBoolean, IsNotEmpty, IsDecimal } from 'class-validator';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(() => User, user => user.offers)
    @IsNotEmpty()
    user: User;
    
    @ManyToOne(() => Wish, wish => wish.offers)
    @IsNotEmpty()
    item: Wish;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsDecimal()
    amount: number;

    @Column({ default: false })
    @IsBoolean()
    hidden: boolean;
}