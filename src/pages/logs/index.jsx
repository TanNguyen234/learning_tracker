import { Table, Typography, Tag, Empty } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./style.scss";
import { useSelector } from "react-redux";
import { getAllLogs } from "../../services/log";

const { Title } = Typography;

function LogsPage() {
  const [logs, setLogs] = useState([]);
  const data = useSelector((state) => state.logs);
  const skills = useSelector((state) => state.skills) || [];
  const user = useSelector((state) => state.user);
  console.log(skills);

  const fetchApi = async () => {
    try {
      const data = await getAllLogs(user.access_token);
      console.log(data);
      setLogs(data || []);
      return data || [];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [user]);

  const columns = [
    {
      title: "ID kỹ năng",
      dataIndex: "skill_id",
      key: "skill_id",
      render: (skillId) => <Tag color="magenta">#{skillId}</Tag>,
    },
    {
      title: "Tên kỹ năng",
      dataIndex: "skill_name",
      key: "skill_name",
      render: (name) => <Tag color="blue">{name || "Không rõ kỹ năng"}</Tag>,
    },
    {
      title: "Bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      render: (start) => dayjs(start).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      render: (end) => dayjs(end).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Thời lượng (phút)",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return (
    <div className="logs" style={{ padding: 16, width: "100%" }}>
      <Title level={2}>Lịch sử học tập</Title>

      {logs.length === 0 ? (
        <Empty description="Chưa có lịch sử học" />
      ) : (
        <Table
          columns={columns}
          dataSource={(logs || []).map((log) => ({ ...log, key: log.id }))}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
}

export default LogsPage;
