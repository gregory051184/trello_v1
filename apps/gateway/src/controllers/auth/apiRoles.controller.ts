import {Controller, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";


@Controller('roles')
export class ApiRolesController {
    constructor(@Inject('ROLES') private readonly rolesClient: ClientProxy) {
    }
}