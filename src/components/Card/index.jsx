import { Card, Tag, Button, Space } from "antd";
import { Link } from "react-router-dom";

const statusColor = {
  Done: "green",
  Learning: "blue",
  Planned: "orange",
};

function CardComponent(props) {
  const { id, title, status } = props;
  return (
    <Card
      title={title}
      extra={<Tag color={statusColor[status] || "default"}>{status}</Tag>}
      style={{ width: "100%" }}
    >
      <Space>
        <Link to={"/skill/detail/" + id}>
          <Button type="default">Xem</Button>
        </Link>
        <Link to={"/skill/update/" + id}>
          <Button type="primary" danger>
            Sửa
          </Button>
        </Link>
        <Link to={"/skill/delete/" + id}>
          <Button danger>Xóa</Button>
        </Link>
      </Space>
    </Card>
  );
}

export default CardComponent;