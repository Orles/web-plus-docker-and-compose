import { Controller, Post, Get, Req, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() user:CreateUserDto): Promise<User> {
        return this.usersService.create(user)
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll()
    }
    
    @UseGuards(JwtGuard)
    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.usersService.removeOne(id)
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async findMe(@Req() req) {
        return req.user
    }

    @UseGuards(JwtGuard)
    @Patch('me')
    async update(@Req() req: Request & {user: User}, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateOne(req.user.id, updateUserDto)
    }

    @UseGuards(JwtGuard)
    @Get('me/wishes')
    async findMeWishes(@Req() { user: {id}}) {
        return await this.usersService.findWishes(id)
    }

    @UseGuards(JwtGuard)
    @Get(':username')
    async findUserName(@Param('username') username: string) {
        const user = await this.usersService.findUserName(username);
        return user
    }

    @UseGuards(JwtGuard)
    @Get(':username/wishes')
    async findUserNameWishes(@Param('username') username: string) {
        const {id} = await this.usersService.findUserName(username);
        return await this.usersService.findWishes(id)
    }

    @UseGuards(JwtGuard)
    @Post('find')
    async findMany(@Body('query') query: string) {
        return await this.usersService.findMany(query)
    }
}