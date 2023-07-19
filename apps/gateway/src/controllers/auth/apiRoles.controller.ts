import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RoleCreateDto} from "@app/common";


@Controller('roles')
export class ApiRolesController {
    constructor(@Inject('ROLES') private readonly rolesClient: ClientProxy) {
    }

    @Post()
    async create(@Body() roleCreateDto: RoleCreateDto) {
        return this.rolesClient.send({cmd: 'create-role'}, {roleCreateDto});
    };

    @Get()
    async getAll() {
        return this.rolesClient.send({cmd: 'get-all-roles'}, {});
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        return this.rolesClient.send({cmd: 'get-role-by-id'}, {id});
    };

    @Get('/name/:name')
    async getByName(@Param('name') name: string) {
        return this.rolesClient.send({cmd: 'get-role-by-name'}, {name});
    };

    @Put('/update/:id')
    async update(
        @Param('id') id: string, @Body() roleCreateDto: RoleCreateDto) {
        return this.rolesClient.send({cmd: 'update-role'}, {id, roleCreateDto});
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return this.rolesClient.send({cmd: 'delete-role'}, {id});
    }
}