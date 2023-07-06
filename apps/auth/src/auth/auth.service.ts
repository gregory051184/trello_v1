import { Injectable } from '@nestjs/common';
import {MicroserviceTestingDto} from "@app/common";

@Injectable()
export class AuthService {
  async checkMicroservice(): Promise<MicroserviceTestingDto> {
    return {title: 'auth', message: 'микросервис запущен'}
  }
}
