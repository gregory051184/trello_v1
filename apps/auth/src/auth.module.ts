import { Module } from '@nestjs/common';
import { AuthController } from "./auth/auth.controller";
import { UsersController } from "./users/users.controller";
import { RolesController } from "./roles/roles.controller";
import { AuthService } from "./auth/auth.service";
import { UsersService } from "./users/users.service";
import { RolesService } from "./roles/roles.service";
import {CommonModule} from "@app/common";

@Module({
  imports: [CommonModule],
  controllers: [AuthController, UsersController, RolesController],
  providers: [AuthService, UsersService, RolesService],
})
export class AuthModule {}
