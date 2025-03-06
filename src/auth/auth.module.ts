import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsService } from "src/accounts/accounts.service";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity], "dbMain"),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtService, AuthService, AccountsService],
  exports: [AuthService],
})
export class AuthModule {}
