import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const accessToken = req.headers["authorization"].split(" ")[1];

    try {
      await this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
