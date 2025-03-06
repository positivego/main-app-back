import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class LoginGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { email, password } = req.body;

    if (!email?.length) throw new HttpException("email not pass", HttpStatus.BAD_REQUEST);
    if (email?.length > 200) throw new HttpException("email to long", HttpStatus.BAD_REQUEST);

    if (!password?.length) throw new HttpException("password not pass", HttpStatus.BAD_REQUEST);
    if (password?.length < 8) throw new HttpException("password to short", HttpStatus.BAD_REQUEST);
    if (password?.length > 200) throw new HttpException("password to long", HttpStatus.BAD_REQUEST);

    return true;
  }
}
