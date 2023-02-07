const geoIpService = require("../data/services/geoIpService");
const { isValidIp } = require("../utils/validations");

const getIpInfo = async (req, res, next) => {
  try {
    const { ip } = req.body;

    if (!isValidIp(ip)) {
      res.status(400).json({ message: "IP was incorrect", status: 400 });
      return;
    }

    const data = await geoIpService.getIpInfo(ip);

    res.status(200).json(data);
    return;
  } catch (error) {
    next(error);
    return;
  }
};

module.exports = {
  getIpInfo,
};
