import { Body, Controller, Post } from '@nestjs/common';
import { UsersEntity } from './entites/user.entity';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { loginCredentialsDto } from './dto/login-credentialsDto.Dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }
    @Post()
    register(
        @Body() userData: UserSubscribeDto
    )
        : Promise<Partial<UsersEntity>> {
        return this.userService.register(userData);
    }

    @Post('login')
    login(
        @Body() credentials: loginCredentialsDto
    ) {
        return this.userService.login(credentials);
    }

}
