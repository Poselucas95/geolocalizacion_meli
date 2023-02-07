const Sequelize = require("sequelize");
const config = require("../../config");

let instance = null;

module.exports = function getDbInstance() {
  if (!instance) {
    instance = new Sequelize(
      config.mysql.MYSQL_DATABASE,
      config.mysql.MYSQL_USER,
      config.mysql.MYSQL_PASSWORD,
      {
        host: config.mysql.MYSQL_HOST,
        port: config.mysql.MYSQL_PORT,
        dialect: "mysql",
        define: {
          scopes: {
            excludeCreatedAtUpdateAt: {
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          },
          timestamps: false,
        },
      }
    );
  }
  return instance;
};
