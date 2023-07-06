import {Controller, Get, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MicroserviceTestingDto} from "@app/common";

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
    async checkMicroservice(): Promise<object>{
        return this.authClient.send({cmd: "check-auth"}, {})
    }
}
