import React, { useEffect, useState } from "react";
import { Col, Row, Divider, notification } from "antd";

import GeoIpForm from "./Form/Form";
import Statistics from "./Statistics/Statistics";
import IpResult from "./IpResult/IpResult";
import "./Home.scss";

import useGeoIpMutation from "../../services/useGeoIpMutation";
import useStatisticsMutation from "../../services/useStatisticsMutation";

import { DEFAULT_GEO_IP_DATA, GeoIpData } from "../../interfaces/GeoIpData";
import { StatisticsData } from "../../interfaces/StatisticsData";

const Home = () => {
  const [ipInfo, setIpInfo] = useState<GeoIpData>();
  const [statisticsData, setStatisticsData] = useState<
    StatisticsData | undefined
  >();
  const [api, contextHolder] = notification.useNotification();

  const { searchIp, isLoading: geoIpDataLoading } = useGeoIpMutation(
    (data: GeoIpData) => {
      setIpInfo(data);
    },
    (error: any) => {
      if (error && error.response) {
        const { data } = error.response;
        return notificationError(data.message);
      }
      return notificationError();
    }
  );

  const { getStatistics, isLoading: statisticsLoading } = useStatisticsMutation(
    (data: StatisticsData) => {
      setStatisticsData(data);
    },
    (error: any) => {
      if (error && error.response) {
        const { data } = error.response;
        return notificationError(data.message);
      }
      return notificationError();
    }
  );

  useEffect(() => {
    getStatistics();
  }, []);

  const notificationError = (message?: string) => {
    api["error"]({
      message: message || "No se pudo cargar la información",
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {contextHolder}
      <Row className="container" justify={"space-around"}>
        <Col span={10}>
          <div className="card">
            <Divider>Localizar IP</Divider>
            <GeoIpForm
              isLoading={geoIpDataLoading}
              onSearch={searchIp}
              reloadStatistics={getStatistics}
            />
            <IpResult ipInfo={ipInfo || DEFAULT_GEO_IP_DATA} />
          </div>
        </Col>
        <Col>
          <Divider type="vertical" className="container-divider" />
        </Col>
        <Col span={10}>
          <div className="card">
            <Statistics
              isLoading={statisticsLoading}
              statistics={statisticsData}
              onRefresh={getStatistics}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
