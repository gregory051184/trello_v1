import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {User, UserRegistrationDto} from "@app/common";
import {Observable} from "rxjs";


@Controller('users')
export class ApiUsersController {
    constructor(@Inject('USERS') private readonly usersClient: ClientProxy) {
    }

    @Post()
    async registration(@Body() userRegistrationDto: UserRegistrationDto): Promise<Observable<User>> {
        console.log(userRegistrationDto)
        return this.usersClient.send({cmd: 'registration'}, {userRegistrationDto});
    };

    @Get()
    async getAll(): Promise<Observable<User[]>> {
        return this.usersClient.send({cmd: 'get-all-users'}, {});
    };

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'get-user-by-id'}, {id});
    };

    @Get('/email/:email')
    async getByEmail(@Param('username') email: string): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'get-user-by-email'}, {email});
    };

    @Get('/username/:username')
    async getByUserName(@Param('username') username: string): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'get-user-by-userName'}, {username});
    };

    @Put('/:id')
    async update(@Body() userRegistrationDto: UserRegistrationDto, @Param('id') id: string) {
        return this.usersClient.send({cmd: 'update-user'}, {userRegistrationDto, id})
    };

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return this.usersClient.send({cmd: 'delete-user'}, {id})
    };
}