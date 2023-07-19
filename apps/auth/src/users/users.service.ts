import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@app/common";
import {Repository} from "typeorm";
import {UserRegistrationDto} from "@app/common";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly rolesService: RolesService) {
    };

    async registration(userRegistrationDto: UserRegistrationDto): Promise<User> {
        const user = await this.userRepository.create(userRegistrationDto);
        await this.userRepository.save(user)
        return user;
    };

    async getAll(): Promise<Array<User>> {
        const users = await this.userRepository.find();
        return users
    };

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {id: +id}});
        return user;
    };

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email: email}});
        return user;
    };

    async getByUserName(userName: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {userName: userName}});
        return user;
    };

    //возможно излишний метод
    async addRole(role: string, id: string): Promise<User> {
        const existing_user = await this.userRepository.findOne({where: {id: +id}});
        if (existing_user.roleId) {
            throw new Error(`User ${existing_user.userName} already has role`);
        }
        const userRole = await this.rolesService.getByName(role);
        await this.userRepository.update(+id, {roleId: userRole.id});
        const user = await this.userRepository.findOne({where: {id: +id}});
        return user;
    };

    async delete(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {id: +id}});
        await this.userRepository.delete(+id);
        return user
    };

    async update(userRegistrationDto: UserRegistrationDto, id: string): Promise<User> {
        await this.userRepository.update(+id, {...userRegistrationDto})
        const user = await this.userRepository.findOne({where: {id: +id}});
        return user
    }
}
