import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsController } from "./accounts.controller";
import { AccountsService } from "./accounts.service";
import { AccountEntity } from "./entities/account.entity";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity], "dbMain"), JwtModule],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
