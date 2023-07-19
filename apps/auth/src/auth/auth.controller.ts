import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {MicroserviceTestingDto} from "@app/common";


@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern({cmd: "check-auth"})
    async checkMicroservice(): Promise<MicroserviceTestingDto> {
        return await this.authService.checkMicroservice();
    };

    @MessagePattern({cmd: "login"})
    async login(@Ctx() context: RmqContext,
                @Payload() payload): Promise<object> {
        return await this.authService.login(payload.userLoginDto);
    };

    @MessagePattern({cmd: "logout"})
    async logout(@Ctx() context: RmqContext,
                 @Payload() payload): Promise<object> {
        return await this.authService.logout(payload.headers)
    };

}
