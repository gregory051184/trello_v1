import { ConfigService } from '@nestjs/config';
import {Injectable} from "@nestjs/common";
import {RmqContext, RmqOptions, Transport} from "@nestjs/microservices";

@Injectable()
export class CommonService {
    constructor(private readonly configService: ConfigService) {}

    getRmqOptions(queue: string, noAck = false): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBITMQ_URI')],
                queue,
                noAck,
                persistent: true,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }

    acknowledgeMessage(context: RmqContext) {
        const channel = context.getChannelRef();
        const message = context.getMessage();

        channel.ack(message)
    }
}