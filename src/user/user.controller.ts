import { Body, Controller, Post } from '@nestjs/common';
import { UsersEntity } from './entites/user.entity';
import { UserService } from './user.service';
import { UserSubscribeDto } from './dto/user-subscribe.dto';

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
}
