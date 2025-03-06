import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class RefreshGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { refreshToken } = req.body;

    if (!refreshToken?.length) throw new HttpException("token not pass", HttpStatus.BAD_REQUEST);

    return true;
  }
}
