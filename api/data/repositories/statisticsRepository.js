const statistics = require("../../models/statisticsModel");

const getStats = async () => {
  try {
    return statistics.sequelize
      .query(
        "SELECT MIN(distance) AS min_distance, \
              MAX(distance) AS max_distance, \
              AVG(distance) AS average_distance, \
              count(*) AS quantity FROM statistics",
        { type: statistics.sequelize.QueryTypes.SELECT }
      )
      .then((response) => response[0]);
  } catch (error) {
    throw error;
  }
};

const save = async (ipRow) => {
  try {
    const row = await statistics.create(ipRow);
    return row;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getStats,
  save,
};
