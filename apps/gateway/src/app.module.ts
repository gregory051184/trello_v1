import {Module} from '@nestjs/common';
import {ApiAuthController} from "./controllers/auth/apiAuth.controller";
import {ApiCardsController} from "./controllers/cards/apiCards.controller";
import {CommonModule} from "@app/common";
import {ApiUsersController} from "./controllers/auth/apiUsers.controller";
import {ApiRolesController} from "./controllers/auth/apiRoles.controller";
import {ConfigService} from "@nestjs/config";


@Module({
    imports: [
        CommonModule,
        CommonModule.registerRmq({name: 'AUTH'}),
        CommonModule.registerRmq({name: 'USERS'}),
        CommonModule.registerRmq({name: 'ROLES'}),
        CommonModule.registerRmq({name: 'CARDS'}),
    ],
    controllers: [ApiAuthController, ApiCardsController, ApiUsersController, ApiRolesController],
    providers: [],
})
export class AppModule {
}
