import { Controller } from '@nestjs/common';
import { CheckListsService } from './checkLists.service';


@Controller()
export class CheckListsController {
  constructor(private readonly cardsService: CheckListsService) {}
}
