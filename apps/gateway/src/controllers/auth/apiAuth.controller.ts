import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MicroserviceTestingDto} from "@app/common";
import {UserLoginDto} from "@app/common/dto/userDto/userLogin.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class ApiAuthController {
    constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {
    }

    @ApiOperation({summary: 'Проверка микросервиса "auth"'})
    @ApiResponse({
        status: 200, description: 'объект с названием микросервиса и сообщением,' +
            ' если микросервис работает.', type: MicroserviceTestingDto
    })
    @Get()
    async checkMicroservice(): Promise<object> {
        return this.authClient.send({cmd: 'check-auth'}, {})
    }

    @Post('/login')
    async login(@Body() userLoginDto: UserLoginDto): Promise<object> {
        return this.authClient.send({cmd: 'login'}, {userLoginDto})
    }

    @Get('logout')
    async logout(): Promise<object> {
        return this.authClient.send({cmd: 'logout'}, {})
    }
}
