import { Controller } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';


@Controller()
export class AttachmentsController {
  constructor(private readonly cardsService: AttachmentsService) {}

}
