import { Row, Col, Pagination } from "antd";
import CardComponent from "../../components/Card/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSkill } from "../../services/skill";
import { getCookie } from "../../helpers/cookie";

function Skill() {
  const skills = useSelector((state) => state.skills);
  const [data, setData] = useState(skills);
  const [pagination, setPagination] = useState({
    current_page: 1,
    limit: 5,
    offset: 0,
    total_pages: 5,
    total_items: 10,
  });

  const fetchApi = async (page = 1, limit = 5) => {
    const accessToken = getCookie("access_token");
    const dataApi = await getSkill(accessToken, page, limit);
    if (dataApi) {
      setData(dataApi.data);
      setPagination(dataApi.pagination);
    }
  };

  useEffect(() => {
    fetchApi(pagination.current_page, pagination.limit);
  }, []);

  const handlePageChange = (page) => {
    fetchApi(page, pagination.limit);
  };

  return (
    <div style={{ padding: 16, width: "100%" }}>
      <Row gutter={[16, 16]}>
        {data && data.length > 0 ? (
          data.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={11} lg={8} xl={6}>
              <CardComponent
                id={item.id}
                status={item.status}
                title={item.title}
              />
            </Col>
          ))
        ) : (
          <>Hiện chưa có bài học nào??</>
        )}
      </Row>
      {pagination.total_items > 0 && (
        <Pagination
          current={pagination.current_page}
          pageSize={pagination.limit}
          total={pagination.total_items}
          onChange={handlePageChange}
          style={{ marginTop: 24, textAlign: "center" }}
        />
      )}
    </div>
  );
}

export default Skill;
