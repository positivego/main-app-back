import { Global, Module } from "@nestjs/common";
import { CacheRedisController } from "./redis.controller";
import { CacheRedisService } from "./redis.service";

@Global()
@Module({
  controllers: [CacheRedisController],
  providers: [CacheRedisService],
  exports: [CacheRedisService],
})
export class CacheRedisModule {}
