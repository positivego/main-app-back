import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHING_EXP } from "libs/constants/redis.constants";

@Injectable()
export class CacheRedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  test = {
    get: async (): Promise<string | null> => {
      const { key } = CACHING_EXP.test;
      return this.cacheManager.get(key());
    },

    set: async (str: string) => {
      const { key, ttl } = CACHING_EXP.test;
      console.log("324234");
      await this.cacheManager.set(key(), str, ttl);
      console.log("324234");
    },

    clear: async () => {
      const { key } = CACHING_EXP.test;
      await this.cacheManager.del(key());
    },
  };
}
