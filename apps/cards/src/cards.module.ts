import {Module} from '@nestjs/common';
import {CardsController} from './cards/cards.controller';
import {CardsService} from './cards/cards.service';
import {CommonModule} from "@app/common";
import {AttachmentsController} from "./attachments/attachments.controller";
import {CheckListsController} from "./checkLists/checkLists.controller";
import {CommentsController} from "./comments/comments.controller";
import {ListsController} from "./lists/lists.controller";
import {AttachmentsService} from "./attachments/attachments.service";
import {CheckListsService} from "./checkLists/checkLists.service";
import {CommentsService} from "./comments/comments.service";
import {ListsService} from "./lists/lists.service";
import {LabelsService} from "./labels/labels.service";
import {LabelsController} from "./labels/labeles.controller";
import {UsersController} from "./users/users.controller";
import {UsersService} from "./users/users.service";

@Module({
    imports: [CommonModule],
    controllers: [CardsController, AttachmentsController, CheckListsController, CommentsController,
        LabelsController, ListsController, UsersController],
    providers: [CardsService, AttachmentsService, CheckListsService, CommentsService, LabelsService,
        ListsService, UsersService],
})
export class CardsModule {
}
