import {Controller} from '@nestjs/common';
import {RolesService} from './roles.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {Role} from "@app/common";

@Controller()
export class RolesController {
    constructor(private readonly rolesService: RolesService) {
    }

    @MessagePattern({cmd: 'create-role'})
    async create(@Ctx() context: RmqContext,
                 @Payload() payload): Promise<Role> {
        return await this.rolesService.create(payload.roleCreateDto);
    };

    @MessagePattern({cmd: 'get-all-roles'})
    async getAll(): Promise<Array<Role>> {
        return await this.rolesService.getAll();
    };

    @MessagePattern({cmd: 'get-role-by-id'})
    async getById(@Ctx() context: RmqContext,
                  @Payload() payload): Promise<Role> {
        return await this.rolesService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-role-by-name'})
    async getByName(@Ctx() context: RmqContext,
                    @Payload() payload): Promise<Role> {
        return await this.rolesService.getByName(payload.name);
    };

    @MessagePattern({cmd: 'update-role'})
    async update(@Ctx() context: RmqContext,
                 @Payload() payload): Promise<Role> {
        return await this.rolesService.update(payload.roleCreateDto, payload.id);
    };

    @MessagePattern({cmd: 'delete-role'})
    async delete(@Ctx() context: RmqContext,
                 @Payload() payload): Promise<Role> {
        return await this.rolesService.delete(payload.id);
    };
}
