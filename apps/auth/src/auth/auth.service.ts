import {BadRequestException, Injectable} from '@nestjs/common';
import {MicroserviceTestingDto, Token, User} from "@app/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDto} from "@app/common";
import * as bcrypt from "bcryptjs";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) {
    }

    async checkMicroservice(): Promise<MicroserviceTestingDto> {
        return {title: 'auth', message: 'микросервис запущен'}
    }

    async login(userLoginDto: UserLoginDto): Promise<object> {
        const user = await this.usersService.getByEmail(userLoginDto.email);
        if (!user) {
            throw new BadRequestException("User does not exist");
        }
        const passwordMatches = await bcrypt.compare(userLoginDto.password, user.password);
        if (!passwordMatches) {
            throw new BadRequestException("Неверный пароль");
        }
        const tokens = await this.generateTokens(user.id, user.userName, user.email, user.roleId);
        await this.createOrUpdateRefreshToken(tokens['refreshToken'], user)
        return tokens
    };

    async logout(headers: object): Promise<object> {
        const user = this.jwtService.decode(headers["authorization"].split(" ")[1]);
        await this.tokenRepository.update(user, {refreshToken: null});

        return {
            msg: `Пользователь ${user['userName']} вышел из аккаунта`
        }
    }

    private async createOrUpdateRefreshToken(refreshToken: string, user: User) {
        const token = await this.tokenRepository.findOne({where: {refreshToken: refreshToken, user: user}})
        if (!token) {
            await this.tokenRepository.create({refreshToken: refreshToken, user: user});
        }
        await this.tokenRepository.update(user.id, {refreshToken: refreshToken});
    }

    private async generateTokens(id: number, userName: string, email: string, roleId: number): Promise<object> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                    id,
                    userName,
                    email,
                    roleId
                },
                {
                    secret: this.configService.get('JWT_ACCESS_SECRET'),
                    expiresIn: '15m'
                }),
            this.jwtService.signAsync({
                    id,
                    userName,
                    email,
                    roleId
                },
                {
                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                    expiresIn: '5d'
                })
        ])
        return {accessToken, refreshToken};
    }
}


