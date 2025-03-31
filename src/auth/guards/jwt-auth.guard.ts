import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountRoleEnum } from "libs/constants/accounts.constants";
import { AccountsService } from "src/accounts/accounts.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private AccountService: AccountsService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    // либо например когда делаем запросы с moviestera то проверяем его ключ
    // и если он валидный то return true

    try {
      const accessToken = req.headers["authorization"]?.split(" ")?.[1] ?? "";
      const jwtData = await this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });

      const account = await this.AccountService.getOne({ id: jwtData.id });
      if (account?.roleId == AccountRoleEnum.superAdmin) return true;
      if (account?.roleId == AccountRoleEnum.admin) {
        if (account?.isBanned) throw new Error("Account is banned");
        // далее проверяем permissions на то какие действия доступны админу
      }
      throw new Error("Account is not admin");
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
