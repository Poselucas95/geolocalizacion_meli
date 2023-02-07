const axios = require("axios");
const config = require("../../config");

async function getIpInfo(ip) {
  try {
    const response = await axios.get(
      `http://api.ipapi.com/api/${ip}?access_key=${config.apiKeys.API_IP_GEO_KEY}`
    );

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
  getIpInfo,
};
