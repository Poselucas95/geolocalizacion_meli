const constants = require("../../utils/constants");
const cacheRepository = require("../repositories/cacheRepository");

const getStatistic = async () => {
  const data = await getData(constants.CACHE.STATISTIC);
  return JSON.parse(data);
};

const setStatistic = (data) =>
  setData(constants.CACHE.STATISTIC, JSON.stringify(data));

const delStatistic = () => cacheRepository.del(constants.CACHE.STATISTIC);

const saveAndGetCountry = (countries, countryCode) => {
  let country;

  for (const ctr of countries) {
    setData(ctr.cca2, ctr);
    if (ctr.cca2 === countryCode) {
      country = ctr;
    }
  }
  return country;
};

const setData = (key, data) =>
  cacheRepository.set(key, JSON.stringify(data), 300, true);

const getData = async (key) => {
  const data = await cacheRepository.get(key);
  return JSON.parse(data);
};

module.exports = {
  getStatistic,
  setStatistic,
  delStatistic,
  getData,
  saveAndGetCountry,
  setData,
};
