import { Injectable } from '@nestjs/common';
import {MicroserviceTestingDto} from "@app/common";

@Injectable()
export class CardsService {
  checkMicroservice(): MicroserviceTestingDto {
    return {title: 'cards', message: 'микросервис запущен'};
  }
}
