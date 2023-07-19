import {Controller} from '@nestjs/common';
import {UsersService} from './users.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {User} from "@app/common";
import {Observable} from "rxjs";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @MessagePattern({cmd: 'registration'})
    async registration(@Ctx() context: RmqContext,
                       @Payload() payload): Promise<User> {
        console.log(payload)
        return await this.usersService.registration(payload.userRegistrationDto);
    };

    @MessagePattern({cmd: 'get-all-users'})
    async getAll(): Promise<Array<User>> {
        return await this.usersService.getAll();
    };

    @MessagePattern({cmd: 'get-user-by-id'})
    async getById(@Ctx() context: RmqContext,
                  @Payload() payload): Promise<User> {
        return await this.usersService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-user-by-email'})
    async getByEmail(@Ctx() context: RmqContext,
                     @Payload() payload): Promise<User> {
        return await this.usersService.getByEmail(payload.email);
    };

    @MessagePattern({cmd: 'get-user-by-userName'})
    async getByUserName(@Ctx() context: RmqContext,
                        @Payload() payload): Promise<User> {
        return await this.usersService.getByUserName(payload.userName);
    };

    @MessagePattern({cmd: 'delete-user'})
    async delete(@Ctx() context: RmqContext,
                        @Payload() payload): Promise<User> {
        return await this.usersService.delete(payload.id);
    };

    @MessagePattern({cmd: 'update-user'})
    async update(@Ctx() context: RmqContext,
                 @Payload() payload): Promise<User> {
        return await this.usersService.update(payload.userRegistrationDto, payload.id);
    };
}
