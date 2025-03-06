import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginGuard } from "./guards/login.guard";
import { RefreshGuard } from "./guards/refresh.guard";
import { RegisterGuard } from "./guards/register.guard";
import { LoginExamples } from "./swagger/examples/login.examples";
import { RefreshExamples } from "./swagger/examples/refresh.examples";
import { RegisterExamples } from "./swagger/examples/register.examples";
import { AuthJwtRefreshToken } from "./types/jwt.types";
import { AuthLoginCredential } from "./types/login.types";
import { AuthRegCredential } from "./types/register.types";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("/login")
  @UseGuards(LoginGuard)
  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiBody({ type: AuthLoginCredential, examples: LoginExamples })
  login(@Body() credential: AuthLoginCredential) {
    return this.service.login(credential);
  }

  @Post("/register")
  @UseGuards(RegisterGuard)
  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiBody({ type: AuthRegCredential, examples: RegisterExamples })
  register(@Body() credential: AuthRegCredential) {
    return this.service.register(credential);
  }

  @Post("/token/refresh")
  @UseGuards(RefreshGuard)
  @ApiOperation({ summary: "Обновление refresh токена" })
  @ApiBody({ type: AuthJwtRefreshToken, examples: RefreshExamples })
  refresh(@Body() credential: AuthJwtRefreshToken) {
    return this.service.refreshToken(credential);
  }
}
