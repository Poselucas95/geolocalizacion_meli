const Redis = require("ioredis");
const config = require("../../config");

let instance = null;

module.exports = function getCacheInstance() {
  if (!instance) {
    instance = new Redis({
      host: config.redis.REDIS_HOST,
      port: config.redis.REDIS_PORT,
    });
  }
  return instance;
};
