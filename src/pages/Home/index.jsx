import { Card, Col, message, Row, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { Column, Pie } from "@ant-design/plots";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getStatUser } from "../../redux/statsSlice";

const { Title } = Typography;

function DashboardPage() {
  const [stats, setStats] = useState({
    totalHours: 0,
    totalSkills: 0,
    totalLogs: 0,
    chartData: [],
    skillPieData: [],
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const statRedux = useSelector((state) => state.stats);
  const fetchApi = async () => {
    try {
      const resultAction = await dispatch(getStatUser(user.access_token));

      if (getStatUser.fulfilled.match(resultAction)) {
        message.success("Đã cập nhật thống kê thành công!");
        setStats(resultAction.payload || statRedux);
      } else {
        message.error(resultAction.payload || "Ghi log thất bại.");
      }
    } catch (error) {
      console.error("Log creation error:", error);
      message.error("Đã xảy ra lỗi khi lấy thông kế từ server.");
    }
  };
  useEffect(() => {
    fetchApi();
  }, [user]);

  const columnConfig = {
    data:
      (stats.chartData || []).map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
        }),
      })) || [],
    xField: "date",
    yField: "hours",
    label: {
      position: "top",
      style: {
        fill: "#595959",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: { alias: "Ngày" },
      hours: { alias: "Giờ học" },
    },
  };

  const pieConfig = {
    appendPadding: 10,
    data: stats.skillPieData || [],
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    height: 300,
    label: {
      text: "value",
      labelHeight: 28,
      style: {
        fontSize: 14,
      },
      connector: true, // nối bằng đường kẻ rõ hơn
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div className="dashboard" style={{ padding: 16, width: "100%" }}>
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

      <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
        <Col xs={24} lg={16}>
          <Card title="Biểu đồ giờ học theo ngày" className="dashboard__card">
            <Column {...columnConfig} height={300} />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Tỉ lệ thời gian theo kỹ năng"
            className="dashboard__card"
          >
            <Pie
              {...pieConfig}
              style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
