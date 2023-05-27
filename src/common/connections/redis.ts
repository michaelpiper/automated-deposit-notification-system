import { RedisStorageAdapter } from '../modules/redisAdapter'
import * as config from '../config'
import { type RedisOptions } from 'ioredis'
const RedisClientOptions: RedisOptions = {}

RedisClientOptions.host = config.redis.host
RedisClientOptions.port = config.redis.port
if (config.redis.password !== null) {
  RedisClientOptions.password = config.redis.password
}
if (config.redis.username !== null) {
  RedisClientOptions.username = config.redis.username
}
if (config.redis.db !== null) {
  RedisClientOptions.db = config.redis.db
}

export const RedisAdapter = new RedisStorageAdapter().initialize(RedisClientOptions)
