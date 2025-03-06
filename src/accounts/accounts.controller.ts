import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AccountsService } from "./accounts.service";
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
}
