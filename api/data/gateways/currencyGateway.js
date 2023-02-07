const axios = require("axios");
const config = require("../../config");

const BASE_URL = "https://api.apilayer.com/fixer/latest";

async function getCurrency(currencyCodes) {
  try {
    const formatCurrencyCodes = currencyCodes.join(",");

    const headers = {
      apikey: config.apiKeys.API_CURRENCY_KEY,
    };

    const response = await axios.get(BASE_URL, {
      params: {
        symbols: formatCurrencyCodes,
        base: "USD",
      },
      headers: headers,
    });
    if (response.status !== 200) {
      throw new Error({
        statusCode: response.status,
        message: `${response.statusText}. Error code: ${response.status}`,
      });
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  getCurrency,
};
