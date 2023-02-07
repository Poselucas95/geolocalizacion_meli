import React from "react";
import { Button, Form, Input } from "antd";
import "./Form.scss";

const GeoIpForm = ({
  isLoading,
  onSearch,
  reloadStatistics,
}: {
  isLoading: boolean;
  onSearch: Function;
  reloadStatistics: Function;
}) => {
  const onFinish = (values: any) => {
    onSearch(values).then(() => reloadStatistics());
  };

  return (
    <Form name="form" className="geo-ip-form" onFinish={onFinish}>
      <Form.Item
        label="IP"
        name="ip"
        rules={[
          {
            required: true,
            message: "Ingrese una IP valida!",
            pattern:
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ ||
              /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/ ||
              /^(?!255\.255\.255\.255$)$/ ||
              /^(?!0\.0\.0\.0$)$/,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="localize-button"
        >
          Localizar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeoIpForm;
