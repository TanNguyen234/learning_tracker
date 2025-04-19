import { Row, Col } from "antd";
import CardComponent from "../../components/Card/index";

function Skill() {
  const data = [
    { id: 1, state: "Done", title: "React" },
    { id: 2, state: "Learning", title: "FastAPI" },
    { id: 3, state: "Planned", title: "ReduxToolkit" },
    { id: 4, state: "Planned", title: "MongoDB" },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <CardComponent id={item.id} state={item.state} title={item.title} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Skill;