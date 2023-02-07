const { Model } = require("sequelize");
const { DataTypes } = require("sequelize");
const getDbInstance = require("../data/db/db");

const Statistics = (sequelize) => {
  class Statistics extends Model {}
  Statistics.init(
    {
      ip: {
        allowNull: false,
        type: DataTypes.STRING,
        primaryKey: true,
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      distance: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "statistics",
    }
  );
  return Statistics;
};

const sequelize = getDbInstance();
const statistics = Statistics(sequelize);

module.exports = statistics;
