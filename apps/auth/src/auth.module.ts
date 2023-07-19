import {Module} from '@nestjs/common';
import {AuthController} from "./auth/auth.controller";
import {UsersController} from "./users/users.controller";
import {RolesController} from "./roles/roles.controller";
import {AuthService} from "./auth/auth.service";
import {UsersService} from "./users/users.service";
import {RolesService} from "./roles/roles.service";
import {CommonModule, Role, Token, User, UsersDbModule} from "@app/common";
import {ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {RefreshTokenStrategy} from "./utils/refreshToken.strategy";
import {AccessTokenStrategy} from "./utils/accessToken.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
    imports: [
        UsersDbModule,
        TypeOrmModule.forFeature([User, Role, Token]),
        CommonModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: {
                    expiresIn: "24h"
                },
            }),
            inject: [ConfigService],
        }),],
    controllers: [AuthController, UsersController, RolesController],
    providers: [
        AuthService,
        UsersService,
        RolesService,
        UsersDbModule,
        RefreshTokenStrategy,
        AccessTokenStrategy
    ],
    exports: [UsersService, AuthService, RolesService]
})
export class AuthModule {
}
