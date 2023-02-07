module.exports = {
  mysql: {
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
    MYSQL_HOST:
      process.env.ENVIRONMENT == "production"
        ? process.env.MYSQL_HOST
        : "localhost",
  },
  redis: {
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST:
      process.env.ENVIRONMENT == "production"
        ? process.env.REDIS_HOST
        : "localhost",
  },
  apiKeys: {
    API_IP_GEO_KEY: process.env.API_IP_GEO_KEY,
    API_CURRENCY_KEY: process.env.API_CURRENCY_KEY,
  },
};
