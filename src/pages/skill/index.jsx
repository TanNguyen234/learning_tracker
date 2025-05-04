import { Row, Col } from "antd";
import CardComponent from "../../components/Card/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Skill() {
  const [data, setData] = useState([]);
  const skills = useSelector((state) => state.skills);

  const fetchApi = () => {
    setData(skills)
  }
  useEffect(()=>{
    fetchApi()
  }, [skills])

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        {data.map(item => 
          <Col key={item.id} xs={24} sm={12} md={11} lg={8} xl={6}>
            <CardComponent id={item.id} state={item.state} title={item.title} />
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Skill;