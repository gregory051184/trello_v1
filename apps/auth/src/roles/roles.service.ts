import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role, RoleCreateDto} from "@app/common";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    }

    async create(roleCreateDto: RoleCreateDto): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {name: roleCreateDto.name}});
        if (role) {
            throw new Error(`Role ${role.name} is already exists`);
        }
        const newRole = await this.roleRepository.create(roleCreateDto);
        return newRole;
    };

    async getAll(): Promise<Array<Role>> {
        const roles = await this.roleRepository.find();
        return roles;
    };

    async getById(id: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id: +id}});
        return role;
    }

    async getByName(name: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {name: name}});
        return role;
    }

    async delete(id: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id: +id}});
        await this.roleRepository.delete(+id);
        return role;
    }

    async update(roleCreateDto: RoleCreateDto, id: string): Promise<Role> {
        await this.roleRepository.update(+id, {...roleCreateDto});
        const role = await this.roleRepository.findOne({where: {id: +id}});
        return role;
    }
}
