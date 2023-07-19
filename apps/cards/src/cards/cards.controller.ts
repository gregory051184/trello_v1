import { Controller } from '@nestjs/common';
import { CardsService } from './cards.service';
import {MessagePattern} from "@nestjs/microservices";
import {MicroserviceTestingDto} from "@app/common";

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @MessagePattern({cmd: 'check-cards'})
  checkMicroservice(): MicroserviceTestingDto {
    return this.cardsService.checkMicroservice();
  }
}
