import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UsersService {
    constructor(
        private hashService: HashService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const { password } = createUserDto
            const user = this.usersRepository.create({
                ...createUserDto,
                password: await this.hashService.hash(password)
            })
            return this.usersRepository.save(user)
        } catch (err) {
            throw new BadRequestException('Пользователь с таким username или email уже существует'
            )
        }
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findById(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id })
    }

    async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id)
        const { password } = updateUserDto
        if(!user) {
            throw new BadRequestException('Юзера нет')
        }
        if(password) {
            updateUserDto.password = await this.hashService.hash(password)
        }
        await this.usersRepository.update({ id }, updateUserDto);
        return this.findById(id)
    }

    async removeOne(id: number) {
        return this.usersRepository.delete({ id });
    }

    async findWishes(id: number): Promise<Wish[]> {
        const { wishes } = await this.usersRepository.findOne({
            where: { id },
            relations: { wishes: true }
        })
        return wishes
    }

    async findUserName(username: string): Promise<User> {
        return await this.usersRepository.findOneBy({ username })
    }

    async findMany(query: string) {
        return await this.usersRepository.find({
            where: [{ username: query }, { email: query }]
        })
    }
}