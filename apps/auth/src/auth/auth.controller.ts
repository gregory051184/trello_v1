import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from "@nestjs/microservices";
import {MicroserviceTestingDto} from "@app/common";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd: "check-auth"})
  async checkMicroservice(): Promise<MicroserviceTestingDto> {
    return await this.authService.checkMicroservice();
  }
}
