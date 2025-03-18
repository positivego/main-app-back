import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesExamples } from "./examples/roles.examples";
import { RolesService } from "./roles.service";
import { RoleName } from "./types/general.types";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private service: RolesService) {}

  @Get()
  @ApiOperation({
    summary: "Получаем список ролей",
  })
  @UseGuards(JwtAuthGuard)
  getRoles() {
    return this.service.get();
  }

  @Post()
  @ApiBody({ type: RoleName, examples: RolesExamples })
  @ApiOperation({
    summary: "Создаем новую роль",
  })
  @UseGuards(JwtAuthGuard)
  createRole(@Body() name: RoleName) {
    return this.service.create(name);
  }
}
