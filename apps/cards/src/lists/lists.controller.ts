import { Controller } from '@nestjs/common';
import { ListsService } from './lists.service';


@Controller()
export class ListsController {
  constructor(private readonly cardsService: ListsService) {}
}