const currencyGateway = require("../data/gateways/currencyGateway");
const constants = require("./constants");

const getCountryZoneTimes = (timeZones, currentTime) => {
  return timeZones
    .map((tz) => {
      const date = currentTime.setZone(tz);
      return `${date.toFormat("HH:mm:ss")} (${tz})`;
    })
    .join(" o ");
};

const getCountryLanguage = (languages) => {
  return languages
    .map((language) => `${language.native} (${language.code})`)
    .join(" | ");
};

const getCountryCurrency = async (currencies) => {
  const currencyCodes = Object.keys(currencies);
  const currencyExchange = await currencyGateway.getCurrency(currencyCodes);

  return currencyCodes
    .map((currency) => {
      if (!currencyExchange.rates[currency]) {
        return `${currency} - currency exchange is not available`;
      }

      return `${currency} (1 ${currency} = ${(
        1 / currencyExchange.rates[currency]
      ).toFixed(4)} U$$)`;
    })
    .join(" | ");
};

const calculateDistance = (lat, long) => {
  const { LAT: BS_LAT, LONG: BS_LONG } = constants.BUENOS_AIRES_DISTANCE;
  // Lat and Long of Buenos Aires
  const bsLatRads = toRadians(BS_LAT);
  const bslongtRads = toRadians(BS_LONG);

  const latRads = toRadians(lat);
  const longRads = toRadians(long);

  const dLat = latRads - bsLatRads;
  const dLon = longRads - bslongtRads;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(bsLatRads) *
      Math.cos(latRads);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.trunc(constants.EARTH_RADIUS * c);
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const formatCountryName = (country, ipData) =>
  `${
    country?.translations?.spa?.common
  } (${ipData?.country_name.toLowerCase()})`;

const formatDistanceMessage = (distance, latlng) => {
  const { LAT: BS_LAT, LONG: BS_LONG } = constants.BUENOS_AIRES_DISTANCE;
  return `${distance} kms (${BS_LAT}, ${BS_LONG}) a (${latlng.join(", ")})`;
};

module.exports = {
  getCountryCurrency,
  getCountryLanguage,
  getCountryZoneTimes,
  calculateDistance,
  formatCountryName,
  formatDistanceMessage,
};
