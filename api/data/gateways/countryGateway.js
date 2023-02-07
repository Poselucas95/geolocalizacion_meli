const axios = require("axios");

const BASE_URL = `https://restcountries.com/v3.1/all`;

async function getCountryInfo() {
  try {
    const response = await axios.get(BASE_URL);

    if (response.status !== 200) {
      throw {
        statusCode: response.status,
        message: `${response.statusText}. Error code: ${response.status}`,
      };
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getCountryInfo,
};
