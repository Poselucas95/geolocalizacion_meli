const statisticRepository = require("../repositories/statisticsRepository");
const cacheService = require("../services/cacheService");

const getStats = async () => {
  try {
    let data = await cacheService.getStatistic();

    if (!data) {
      data = await statisticRepository.getStats();
      await cacheService.setStatistic(data);
    }

    return data;
  } catch (error) {
    console.error("Error getting data from cache: ", error);
    return statisticRepository.getStats();
  }
};

const saveIpRow = (ip, country, distance) => {
  const row = {
    ip: ip,
    country: country,
    distance: distance,
  };
  return statisticRepository.save(row).then((response) => response);
};

module.exports = {
  getStats,
  saveIpRow,
};
