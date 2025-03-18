import { Body, Controller, Get, Patch, Query, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AccountsService } from "./accounts.service";
import { AccountEntity } from "./entities/account.entity";
import { AccountsUpdateExamples } from "./examples/accounts.examples";
import { AccountsQueryParams } from "./types/general.types";

@ApiTags("accounts")
@Controller("accounts")
export class AccountsController {
  constructor(private service: AccountsService) {}

  @Get()
  @ApiOperation({
    summary: "Получаем список аккаунтов",
  })
  @UseGuards(JwtAuthGuard)
  get(@Query() params: AccountsQueryParams) {
    return this.service.getWithPagination(params);
  }

  @Patch()
  @ApiBody({ type: AccountEntity, examples: AccountsUpdateExamples })
  @ApiOperation({
    summary: "Обновляем аккаунт",
  })
  @UseGuards(JwtAuthGuard)
  update(@Body() data: AccountEntity) {
    return this.service.update(data);
  }
}
