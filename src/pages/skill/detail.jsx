import "./style.scss";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSkillDetail } from "../../services/skill";
import { useSelector } from "react-redux";
import { getLogs } from "../../services/log";
import Tracker from "./tracker";
import NoteBox from "./note";
import StudySchedule from "./studySchedule";
import StudySummary from "./studySummary";

const { Text, Paragraph } = Typography;

function SkillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [logs, setLogs] = useState([]);
  const user = useSelector((state) => state.user);
  const logSlice = useSelector((state) => state.logs);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleSaveNote = (newNote) => {
    setNote(newNote);
    setIsOpen(false);
  };

  const handleBack = () => navigate(-1);

  const fetchApi = async () => {
    try {
      const data = await getSkillDetail(id, user.access_token);
      if (!data) return handleBack();

      const logForSkill = await getLogs(data.id, user.access_token);
      if (!logForSkill) return handleBack();

      setSkill(data);
      // Đảm bảo logs luôn là mảng
      setLogs(Array.isArray(logForSkill) ? logForSkill : []);
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
      handleBack();
    }
  };

  useEffect(() => {
    fetchApi();
  }, [id, logSlice]);

  const sessions = [
    { name: "Sáng", icon: "🌅", start: 8, end: 10 },
    { name: "Chiều", icon: "🌞", start: 14, end: 16 },
    { name: "Tối", icon: "🌙", start: 20, end: 22 },
  ];

  const getSessionStatus = (session) => {
    if (!Array.isArray(logs) || logs.length === 0) return "Planned";

    const sessionLogs = logs.filter((log) => {
      const logHour = new Date(log.start_time).getHours();
      return logHour >= session.start && logHour < session.end;
    });

    if (sessionLogs.length === 0) return "Planned";
    if (sessionLogs.some((log) => log.status === "Learning")) return "Learning";
    if (sessionLogs.every((log) => log.status === "Done")) return "Done";

    return "Learning";
  };

  const getTotalDurationToday = () => {
    if (!Array.isArray(logs) || logs.length === 0) return 0;
    const today = new Date();
    const todayDate = today.toDateString();

    return logs
      .filter((log) => new Date(log.start_time).toDateString() === todayDate)
      .reduce((total, log) => total + (log.duration || 0), 0);
  };

  const getProgressPercent = () => {
    // Ở đây bạn dùng "Done" thay vì "completed" để thống nhất
    const completedSessions = sessions.filter(
      (session) => getSessionStatus(session) === "Done"
    ).length;
    return Math.round((completedSessions / sessions.length) * 100);
  };

  const totalLessons = skill?.totalLessons || 5;

  // Đảm bảo logs là mảng trước khi filter
  const completedLessons = Array.isArray(logs)
    ? logs.filter((log) => log.status === "Done").length
    : 0;

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
        className="floating-button blob-btn"
        onClick={() => setIsOpen(true)}
      >
        <button className="blob-btn">
          Ghi chú
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </button>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </Button>

      <NoteBox isOpen={isOpen} onClose={() => setIsOpen(false)} onSaveNote={handleSaveNote} />

      <Tracker skill={skill} user={user} note={note} />

      {/* Tiến độ học và lịch sử học */}
      <StudySchedule sessions={sessions} getSessionStatus={getSessionStatus} />

      <StudySummary
        totalDuration={getTotalDurationToday()}
        progressPercent={getProgressPercent()}
        completedLessons={completedLessons}
        totalLessons={totalLessons}
      />

      <div className="study__logs">
        <h3>Lịch sử học</h3>
        {Array.isArray(logs) && logs.length > 0 ? (
          <ul>
            {logs
              .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
              .map((log, index) => (
                <li key={index}>
                  📅 <strong>Ngày:</strong> {new Date(log.start_time).toLocaleDateString()} –{" "}
                  <strong>Thời gian:</strong> {new Date(log.start_time).toLocaleTimeString()} -{" "}
                  {new Date(log.end_time).toLocaleTimeString()} ({log.duration} phút) –{" "}
                  <strong>Ghi chú:</strong> {log.note}
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
