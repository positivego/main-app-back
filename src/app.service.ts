import { Injectable } from "@nestjs/common";
import { CacheRedisService } from "./redis/redis.service";

@Injectable()
export class AppService {
  constructor(private redisService: CacheRedisService) {}
}
