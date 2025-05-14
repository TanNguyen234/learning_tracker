import "./style.scss";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSkillDetail } from "../../services/skill";
import { useSelector } from "react-redux";
import { getLogs } from "../../services/log";
import Tracker from "./tracker";
import NoteBox from "./note";

const { Text, Paragraph } = Typography;

function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [logs, setLogs] = useState([]);
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState('');

  const handleSaveNote = (newNote) => {
    setNote(newNote); // Lưu ghi chú vào state của SkillDetail
    setIsOpen(false); // Đóng NoteBox sau khi lưu
  };

  const handleBack = () => navigate(-1);

  const fetchApi = async () => {
    try {
      const data = await getSkillDetail(id, user.access_token);
      if (!data) return handleBack();

      const logForSkill = await getLogs(data.id, user.access_token);
      if (!logForSkill) return handleBack();
      setSkill(data);
      setLogs(logForSkill);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
      handleBack();
    }
  };

  useEffect(() => {
    fetchApi();
  }, [id]);

  return (
    <div className="study">
      <div className="study__navigate">
        <Button onClick={handleBack}>Quay lại</Button>
        <div className="study__title">{skill?.title || "Loading..."}</div>
      </div>

      {skill && (
        <>
          <Paragraph type="secondary" style={{ fontSize: 16 }}>
            <strong>Mô tả:</strong> {skill.description}
          </Paragraph>
          <Text type="secondary" style={{ fontSize: 16 }}>
            <strong>Trạng thái:</strong> {skill.status}
          </Text>
        </>
      )}

      {/* Nút nổi mở ghi chú */}
      <Button
        shape="circle"
        icon="📝"
        className="floating-button"
        onClick={() => setIsOpen(true)} // Mở NoteBox khi nhấn
      />

      {/* NoteBox component */}
      <NoteBox isOpen={isOpen} onClose={() => setIsOpen(false)} onSaveNote={handleSaveNote} />

      <Tracker skill={skill} user={user} />

      {/* Tiến độ học và lịch sử học */}
      <div className="study__progress">
        <h3>Lịch học hôm nay</h3>
        <ul className="study__sessions">
          <li className="study__session">
            <span>🌅</span>
            <span>
              Sáng (8:00 - 10:00): <strong>✔ Đã học</strong>
            </span>
          </li>
          <li className="study__session">
            <span>🌞</span>
            <span>
              Chiều (14:00 - 16:00): <strong>⏳ Đang học</strong>
            </span>
          </li>
          <li className="study__session">
            <span>🌙</span>
            <span>
              Tối (20:00 - 22:00): <strong>🕗 Chưa bắt đầu</strong>
            </span>
          </li>
        </ul>
      </div>

      <div className="study__summary">
        <h3>📊 Tổng kết hôm nay</h3>
        <ul>
          <li>
            🕒 Tổng thời gian học: <strong>1 giờ 30 phút</strong>
          </li>
          <li>
            🚀 Tiến độ hoàn thành: <strong>60%</strong>
          </li>
          <li>
            📚 Bài đã hoàn thành: <strong>3/5</strong>
          </li>
        </ul>
      </div>

      <div className="study__logs">
        <h3>Lịch sử học</h3>
        {logs.length > 0 ? (
          <ul>
            {logs.map((log, index) => (
              <li key={index}>
                📅 <strong>Ngày:</strong>{" "}
                {new Date(log.start_time).toLocaleDateString()} –{" "}
                <strong>Thời gian:</strong>{" "}
                {new Date(log.start_time).toLocaleTimeString()} -{" "}
                {new Date(log.end_time).toLocaleTimeString()} ({log.duration}{" "}
                phút) – <strong>Ghi chú:</strong> {log.note}
              </li>
            ))}
          </ul>
        ) : (
          <Text type="secondary">Chưa có lịch sử học nào.</Text>
        )}
      </div>
    </div>
  );
}

export default SkillDetail;