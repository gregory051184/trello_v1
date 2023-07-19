import { Controller } from '@nestjs/common';
import {LabelsService} from "./labels.service";



@Controller()
export class LabelsController {
  constructor(private readonly cardsService: LabelsService) {}
}
