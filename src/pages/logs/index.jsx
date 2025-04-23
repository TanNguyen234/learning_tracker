import { Table, Typography, Tag, Empty } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./style.scss";

const { Title } = Typography;

function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // const fetchLogs = async () => {
    //   const res = await getLogs();
    //   setLogs(res.data);
    // };
    // fetchLogs();

    // mock data
    setLogs([
      {
        id: 1,
        skill: "HTML",
        start: "2025-04-20T08:00:00",
        end: "2025-04-20T09:00:00",
        duration: 60,
      },
      {
        id: 2,
        skill: "React",
        start: "2025-04-20T14:30:00",
        end: "2025-04-20T16:00:00",
        duration: 90,
      },
    ]);
  }, []);

  const columns = [
    {
      title: "Kỹ năng",
      dataIndex: "skill",
      key: "skill",
      render: (skill) => <Tag color="blue">{skill}</Tag>,
    },
    {
      title: "Bắt đầu",
      dataIndex: "start",
      key: "start",
      render: (start) => dayjs(start).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Kết thúc",
      dataIndex: "end",
      key: "end",
      render: (end) => dayjs(end).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Thời lượng (phút)",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return (
    <div className="logs">
      <Title level={2}>Lịch sử học tập</Title>

      {logs.length === 0 ? (
        <Empty description="Chưa có lịch sử học" />
      ) : (
        <Table
          columns={columns}
          dataSource={logs.map((log) => ({ ...log, key: log.id }))}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
}

export default LogsPage;