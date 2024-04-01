import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/users.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HashModule } from '../hash/hash.module';
import { HashService } from '../hash/hash.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/strategy/local.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        HashModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: 'jwt.secret',
                signOptions: {
                    expiresIn: configService.get('jwt.expiresIn'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        ConfigService,
        JwtStrategy,
        HashService,
        LocalStrategy,
    ],
    exports: [AuthService, JwtStrategy],
})
export class AuthModule { }