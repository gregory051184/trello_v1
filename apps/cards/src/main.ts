import {NestFactory} from '@nestjs/core';
import {CardsModule} from './cards.module';
import {ConfigService} from "@nestjs/config";
import {CommonService} from "@app/common";

async function bootstrap() {
    const app = await NestFactory.create(CardsModule);

    const configService = app.get(ConfigService);
    const commonService = app.get(CommonService);
    const queue = configService.get("RABBITMQ_CARDS_QUEUE");

    app.connectMicroservice(commonService.getRmqOptions(queue, true));

    await app.startAllMicroservices()
}

bootstrap();
