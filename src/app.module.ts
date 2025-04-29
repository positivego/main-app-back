import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { redisStore } from "cache-manager-redis-store";
import { appConfig } from "config/app.config";
import { join } from "path";
import { AccountsModule } from "./accounts/accounts.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DirectoryService } from "./directory.service";
import { MoviesterModule } from "./moviester/moviester.module";
import { CacheRedisModule } from "./redis/redis.module";
import { RolesModule } from "./roles/roles.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads"),
      serveRoot: "/uploads",
    }),

    TypeOrmModule.forRootAsync({
      name: "dbMain",
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get("dbMain")!,
      inject: [ConfigService],
    }),

    TypeOrmModule.forRootAsync({
      name: "dbMoviester",
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get("dbMoviester")!,
      inject: [ConfigService],
    }),

    ScheduleModule.forRoot(),

    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: "localhost",
        port: 6379,
        ttl: 3600,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    CacheRedisModule,
    RolesModule,
    AccountsModule,
    MoviesterModule,
  ],
  controllers: [AppController],
  providers: [AppService, DirectoryService],
})
export class AppModule {}
