
import { Redis, type RedisOptions } from 'ioredis'
import { BaseStorageAdapter } from './storage'
export class RedisStorageAdapter extends BaseStorageAdapter< Redis, RedisOptions> {
  defaultConfig () {
    return {}
  }

  createConnection (options: RedisOptions) {
    return new Redis(options)
  }
}
