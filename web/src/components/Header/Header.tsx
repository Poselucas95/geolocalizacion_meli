import React from "react";
import { Layout, Col, Row, Typography } from "antd";
import "./Header.scss";

const { Title } = Typography;

const Header = () => {
  return (
    <Layout.Header className="header">
      <Row>
        <Col offset={2}>
          <div className="header-logo" />
        </Col>
        <Col>
          <Title className="header-tittle" level={2}>
            Geolocalización de IPs
          </Title>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
