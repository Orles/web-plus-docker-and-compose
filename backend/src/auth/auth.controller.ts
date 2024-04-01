import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalGuard } from 'src/guard/local.guard';

@Controller()
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(LocalGuard)
    @Post('signin')
    async signin(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.signin(loginUserDto)
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto)
        return this.authService.auth(user)
    }
}