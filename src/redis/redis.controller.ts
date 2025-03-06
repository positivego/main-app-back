import { Controller } from "@nestjs/common";
import { CacheRedisService } from "./redis.service";

@Controller("redis")
export class CacheRedisController {
  constructor(private redisService: CacheRedisService) {}
}
