import { Button, Descriptions, Divider, Spin, Typography } from "antd";
import { StatisticsData } from "../../../interfaces/StatisticsData";
import "./Statistics.scss";

const Statistics = ({
  isLoading,
  statistics,
  onRefresh,
}: {
  isLoading: boolean;
  statistics: StatisticsData | undefined;
  onRefresh: Function;
}) => {
  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <div>
      <Divider>Estadísticas del servicio</Divider>
      <Spin spinning={isLoading} tip="Loading statistics" size="large">
        {!statistics ||
          (statistics && statistics.quantity === 0 && (
            <div className="empty-service">
              <Typography.Text italic>
                El servicio aún no ha sido utilizado.
              </Typography.Text>
            </div>
          ))}
        {statistics && statistics.quantity > 0 && (
          <span>
            <Descriptions
              size="small"
              bordered
              column={1}
              className="ip-descriptions"
            >
              <Descriptions.Item label="Mínima distancia a Bs As consultada">
                {statistics.min_distance}
              </Descriptions.Item>
              <Descriptions.Item label="Máxima distancia a Bs As consultada">
                {statistics.max_distance}
              </Descriptions.Item>
              <Descriptions.Item label="Distancia promedio a Bs As consultada">
                {statistics.average_distance}
              </Descriptions.Item>
              <Descriptions.Item label="Consultas al servicio realizadas">
                {statistics.quantity}
              </Descriptions.Item>
            </Descriptions>
            <br />
            <Button
              loading={isLoading}
              type="primary"
              onClick={handleRefresh}
              block
            >
              Refrescar
            </Button>
          </span>
        )}
      </Spin>
    </div>
  );
};

export default Statistics;
