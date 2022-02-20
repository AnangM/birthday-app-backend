import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobEntity } from "./job.entity";
import { NotificationService } from "./notifications.service";

@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([JobEntity])],
    providers: [NotificationService]
})
export class NotificationModule{
}