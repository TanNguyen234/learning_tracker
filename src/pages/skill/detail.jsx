import "./style.scss";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSkillDetail } from "../../services/skill";

const { Text } = Typography;

function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    let timer;
    if (isStudying) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStudying]);

  // const fetchApi = async () => {
  //   const data = await getSkillDetail(id);
  //   setSkill(data.data);
  // };

  // useEffect(() => {
  //   fetchApi();
  // }, [id]);

  return (
    <div className="study">
      <div className="study__navigate">
        <Button onClick={handleBack}>Quay lại</Button>
        <div className="study__title">{skill?.title || "Loading..."}</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <Text type="secondary" style={{ fontSize: 18 }}>
          ⏱ Thời gian học hiện tại: {formatTime(elapsedTime)}
        </Text>
        <div style={{ marginTop: 12 }}>
          <Button type="primary" onClick={() => setIsStudying(true)} disabled={isStudying}>
            Bắt đầu học
          </Button>
          <Button danger style={{ marginLeft: 8 }} onClick={() => setIsStudying(false)} disabled={!isStudying}>
            Dừng lại
          </Button>
        </div>
      </div>

      <div className="study__timeline">
        <div className="study__time-block">
          <div className="study__time-block--label">Sáng</div>
          <div className="study__time-block--content">Thời gian học: 8:00 - 10:00</div>
        </div>
        <div className="study__time-block">
          <div className="study__time-block--label">Chiều</div>
          <div className="study__time-block--content">Thời gian học: 14:00 - 16:00</div>
        </div>
        <div className="study__time-block">
          <div className="study__time-block--label">Tối</div>
          <div className="study__time-block--content">Thời gian học: 20:00 - 22:00</div>
        </div>
      </div>

      <div className="study__summary">
        <h3>Tổng kết</h3>
        <ul>
          <li>Giờ học hôm nay: 4 giờ</li>
          <li>Tiến độ: 60%</li>
          <li>Bài đã hoàn thành: 3/5</li>
        </ul>
      </div>
    </div>
  );
}

export default SkillDetail;