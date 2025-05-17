import { Row, Col } from "antd";
import CardComponent from "../../components/Card/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSkill } from "../../services/skill";
import { getCookie } from "../../helpers/cookie";

function Skill() {
  const skills = useSelector((state) => state.skills);
  const [data, setData] = useState(skills);

  const fetchApi = async () => {
    const accessToken = getCookie("access_token");
    const dataApi = await getSkill(accessToken);
    setData(dataApi)
  }

  useEffect(()=>{
    fetchApi()
  }, [skills])

  return (
    <div style={{ padding: 16 }}>
      <Row gutter={[16, 16]}>
        {data && data.length > 0 ? data.map(item => 
          <Col key={item.id} xs={24} sm={12} md={11} lg={8} xl={6}>
            <CardComponent id={item.id} status={item.status} title={item.title} />
          </Col>
        ) : <>Hiện chưa có bài học nào??</>}
      </Row>
    </div>
  );
}

export default Skill;