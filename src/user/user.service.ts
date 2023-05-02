import { ConflictException, Injectable } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)  // Modifier cette ligne
        private userRepository: Repository<UsersEntity>

    ) { }
    async register(userData: UserSubscribeDto): Promise<Partial<UsersEntity>> {
        const { name, password, email } = userData;
        const user = this.userRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        this.userRepository.save(user);

        try {
            await this.userRepository.save(user);
        } catch (e) {

            throw new ConflictException('Pseudo, mail et password doivent etre uniques !!!!!! tête de noeud !!!!!')
        }
        // delete user.salt;
        // delete user.password;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    }
}
