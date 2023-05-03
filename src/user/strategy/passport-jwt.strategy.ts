

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from '../interface/payload.interface';
import { UsersEntity } from '../entites/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SHOTOKAN',
        });
    }

    async validate(payload: PayloadInterface) {
        const user = await this.userRepository.findOne({ where: { username: payload.username } });
        if (user) {
            const { password, salt, ...result } = user;
            return result;


        } else {

            throw new UnauthorizedException();
        }



    }
}

