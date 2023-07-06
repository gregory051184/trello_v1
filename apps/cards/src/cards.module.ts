import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import {CommonModule} from "@app/common";

@Module({
  imports: [CommonModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
