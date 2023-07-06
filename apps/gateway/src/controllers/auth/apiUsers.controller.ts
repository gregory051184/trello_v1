import {Controller, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";


@Controller('users')
export class ApiUsersController {
    constructor(@Inject('USERS') private readonly usersClient: ClientProxy) {
    }
}