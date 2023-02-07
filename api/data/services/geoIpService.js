const { DateTime } = require("luxon");

const statisticService = require("../services/statisticService");
const cacheService = require("../services/cacheService");
const geoIpGateway = require("../gateways/geoIpGateway");
const countryGateway = require("../gateways/countryGateway");
const {
  getCountryCurrency,
  getCountryLanguage,
  getCountryZoneTimes,
  calculateDistance,
  formatCountryName,
  formatDistanceMessage,
} = require("../../utils/countryParsed");

const getIpInfo = async (ipAddress) => {
  try {
    // Get ipData from cache or db.
    const ipData = await getIpData(ipAddress);

    if (!ipData) {
      throw { message: "No IP information found.", status: 404 };
    }
    const body = await buildResponseData(ipAddress, ipData);

    await statisticService.saveIpRow(
      ipAddress,
      ipData.country_name.toLowerCase(),
      body.distance
    );

    await cacheService.delStatistic();

    return body;
  } catch (error) {
    throw error;
  }
};

const buildResponseData = async (ip, ipData) => {
  // Get country from cache or db.
  const country = await getCountry(ipData.country_code);
  if (!country) {
    throw { message: "Country not found", status: 404 };
  }

  const currentDate = DateTime.local();
  // Format current date.
  const localCurrentDate = currentDate.toFormat("dd/MM/yyyy HH:mm:ss");
  // Get dates of the distinct country zone times.
  const zoneTimes = getCountryZoneTimes(country.timezones, currentDate);
  // Format country name.
  const countryName = formatCountryName(country, ipData);
  const IsoCode = ipData.country_code.toLowerCase();
  // Get country languages
  const languages = getCountryLanguage(ipData.location.languages);
  // Get about the country's currencies and their exchange against the dollar.
  const currency = await getCountryCurrency(country.currencies);
  const {
    latlng: [latitude, longitude],
  } = country;
  const distance = calculateDistance(latitude, longitude);
  const formatedDistance = formatDistanceMessage(distance, [
    latitude,
    longitude,
  ]);

  return {
    ip: ip,
    currentDate: localCurrentDate,
    country: countryName,
    isoCode: IsoCode,
    languages: languages,
    currency: currency,
    zoneTimes: zoneTimes,
    distance: distance,
    distanceMessage: formatedDistance,
  };
};

const getCountry = async (countryCode) => {
  let country = await cacheService.getData(countryCode);
  if (!country) {
    const countries = await countryGateway.getCountryInfo();
    country = cacheService.saveAndGetCountry(countries, countryCode);
  }
  return country;
};

const getIpData = async (ip) => {
  let data = await cacheService.getData(ip);
  if (!data) {
    data = await geoIpGateway.getIpInfo(ip);
    cacheService.setData(ip, data);
  }
  return data;
};

module.exports = {
  getIpInfo,
};
