const constants = require("../../utils/constants");
const getCacheInstance = require("../cache/cache");

const cache = getCacheInstance();

module.exports = {
  set: (key, value, ttl = constants.CACHE.TTL, replace = false) => {
    try {
      return cache.set(key, value, "EX", ttl);
    } catch (error) {
      throw error;
    }
  },
  get: (key) => {
    try {
      return cache.get(key);
    } catch (error) {
      throw error;
    }
  },
  del: (key) => {
    cache.del(key);
  },
};
