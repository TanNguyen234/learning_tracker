import { Card, Tag, Button, Space } from "antd";
import { Link } from "react-router-dom";

const statusColor = {
  Done: "green",
  Learning: "blue",
  Planned: "orange",
};

function CardComponent(props) {
  const { id, title, state } = props;

  return (
    <Card
      title={title}
      extra={<Tag color={statusColor[state] || "default"}>{state}</Tag>}
      style={{ width: "100%" }}
    >
      <Space>
        <Link to={"/detail/" + id}>
          <Button type="default">Xem</Button>
        </Link>
        <Link to={"/update/" + id}>
          <Button type="primary" danger>
            Sửa
          </Button>
        </Link>
        <Link to={"/delete/" + id}>
          <Button danger>Xóa</Button>
        </Link>
      </Space>
    </Card>
  );
}

export default CardComponent;