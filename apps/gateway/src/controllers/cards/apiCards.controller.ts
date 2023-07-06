import {Controller, Get, Inject} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MicroserviceTestingDto} from "@app/common";


@ApiTags('Карточки')
@Controller('cards')
export class ApiCardsController {
    constructor(@Inject('CARDS') private readonly cardsClient: ClientProxy) {
    }

    @ApiOperation({summary: 'Проверка микросервиса "cards"'})
    @ApiResponse({
        status: 200, description: 'объект с названием микросервиса и сообщением,' +
            ' если микросервис работает.', type: MicroserviceTestingDto
    })
    @Get()
    async checkCards() {
        return this.cardsClient.send({cmd: "check-cards"}, {})
    }
}