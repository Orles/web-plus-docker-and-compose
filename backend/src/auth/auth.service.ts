import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { User } from '../user/entities/user.entity';
import { UsersService } from 'src/user/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly hashService: HashService
    ) { }

    async auth(user: User) {
        const payload = {sub: user.id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validate(username: string, password: string) {
        const user = await this.usersService.findUserName(username)

        if (user && (await this.hashService.compare(password, user.password))) {
            return user;
        } else {
            throw new UnauthorizedException('Неправильный пароль')
        }
    }

    async signin(loginUserDto: LoginUserDto) {
       const user = await this.usersService.findUserName(loginUserDto.username)
       return await this.auth(user)
    }

}