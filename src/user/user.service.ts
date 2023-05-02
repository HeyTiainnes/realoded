import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { UsersEntity } from './entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { loginCredentialsDto } from './dto/login-credentialsDto.Dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity)  // Modifier cette ligne
        private userRepository: Repository<UsersEntity>,
        private jwtService: JwtService
    ) { }
    async register(userData: UserSubscribeDto): Promise<Partial<UsersEntity>> {
        const { name, password, email } = userData;
        const user = this.userRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        //this.userRepository.save(user);

        try {
            await this.userRepository.save(user);
        } catch (e) {
            if (e instanceof QueryFailedError) {
                // Vous pouvez vérifier le code d'erreur pour vous assurer qu'il s'agit d'une violation de contrainte d'unicité
                // et renvoyer un message d'erreur approprié
                console.log('erreur :', e)
                throw new ConflictException("L'identifiant, l'e-mail et le mot de passe doivent être uniques.");
            } else {
                // Vous pouvez gérer d'autres erreurs ici ou les laisser se propager
                throw e;
            }
        }
        // delete user.salt;
        // delete user.password;
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    }
    async login(credentials: loginCredentialsDto) {

        const { username, password } = credentials

        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.username = :username or user.email = :username",
                { username }
            )
            .getOne()
        console.log(username, password);


        if (!user)

            throw new NotFoundException(`l\'utilisateur (ou le mail, ou le password) ${username}  n'existe(nt) pas dans la base de donnée`)

        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                role: user.role
            }
            const jwt = await this.jwtService.sign(payload);
            return {
                "acces_token": jwt
            };



            console.log('req:', Request);
            console.log('rep:', Response);
            // return {

            //     username: user.username,
            //     email: user.email,
            //     role: user.role
            // }

        } else {

            throw new NotFoundException(`l\'utilisateur (ou le mail, ou le password) ${username}  n'existe(nt) pas dans la base de donnée`);
            console.log('comparaison donnees false')
        }


    }





}
