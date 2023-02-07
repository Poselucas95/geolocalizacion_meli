const statisticService = require("../data/services/statisticService");

const getStats = async (req, res, next) => {
  const statistic = await statisticService.getStats();
  res.status(200).json(statistic);
};

module.exports = {
  getStats,
};
