import { Descriptions, Divider } from "antd";
import { GeoIpData } from "../../../interfaces/GeoIpData";

const IpResult = ({ ipInfo }: { ipInfo: GeoIpData }) => {
  const isValidData = ipInfo && !!ipInfo.ip;
  if (!isValidData) {
    return <div></div>;
  }

  return (
    <span>
      <Divider>Resultado</Divider>
      <Descriptions
        size="small"
        bordered
        column={1}
        className="ip-descriptions"
      >
        <Descriptions.Item label="IP">{ipInfo.ip}</Descriptions.Item>
        <Descriptions.Item label="Fecha actual">
          {ipInfo.currentDate}
        </Descriptions.Item>
        <Descriptions.Item label="País">{ipInfo.country}</Descriptions.Item>
        <Descriptions.Item label="ISO Code">{ipInfo.isoCode}</Descriptions.Item>
        <Descriptions.Item label="Idiomas">
          {ipInfo.languages}
        </Descriptions.Item>
        <Descriptions.Item label="Moneda">{ipInfo.currency}</Descriptions.Item>
        <Descriptions.Item label="Hora">{ipInfo.zoneTimes}</Descriptions.Item>
        <Descriptions.Item label="Distancia estimada hasta Buenos Aires">
          {ipInfo.distanceMessage}
        </Descriptions.Item>
      </Descriptions>
    </span>
  );
};

export default IpResult;
