import { Card, Col, Row, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

import "./style.scss";

const { Title } = Typography;

function DashboardPage() {
  const [stats, setStats] = useState({
    totalHours: 0,
    totalSkills: 0,
    totalLogs: 0,
  });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const res = await getDashboardStats();
//       setStats(res.data);
//     };
//     fetchStats();
//   }, []);

  return (
    <div className="dashboard">
      <Title level={2}>Tổng quan học tập</Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="dashboard__card">
            <Statistic
              title="Tổng số giờ học"
              value={stats.totalHours}
              suffix="giờ"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="dashboard__card">
            <Statistic
              title="Kỹ năng đã theo dõi"
              value={stats.totalSkills}
              prefix={<FundProjectionScreenOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="dashboard__card">
            <Statistic
              title="Số buổi học đã ghi"
              value={stats.totalLogs}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;