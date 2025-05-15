import { Button, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postLog } from "../../redux/logsSlice";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

function Tracker({ skill, user, note }) {
  const dispatch = useDispatch();

  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
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

  const handleCreateLog = async () => {
    const end = new Date();
    setIsStudying(false);

    if (!startTime || !user?.access_token) {
      message.error("Không thể tạo log: Thiếu thời gian bắt đầu hoặc token.");
      return;
    }

    const durationInMinutes = Math.floor((end - startTime) / 60000); // convert ms to minutes
    const logData = {
      skill_id: skill.id,
      start_time: startTime.toISOString(),
      end_time: end.toISOString(),
      duration: durationInMinutes,
      note: note,
    };

    try {
      const resultAction = await dispatch(
        postLog({ logData, access_token: user.access_token })
      );

      if (postLog.fulfilled.match(resultAction)) {
        message.success("Ghi nhận thời gian học thành công!");
      } else {
        message.error(resultAction.payload || "Ghi log thất bại.");
      }
    } catch (error) {
      console.error("Log creation error:", error);
      message.error("Đã xảy ra lỗi khi gửi log.");
    } finally {
      setElapsedTime(0);
      setStartTime(null);
    }
  };

  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      <Text type="secondary" style={{ fontSize: 18 }}>
        ⏱ Thời gian học hiện tại: {formatTime(elapsedTime)}
      </Text>
      <div style={{ marginTop: 12 }}>
        <Button
          type="primary"
          onClick={() => {
            setStartTime(new Date());
            setIsStudying(true);
          }}
          disabled={isStudying}
        >
          Bắt đầu học
        </Button>
        <Button
          danger
          style={{ marginLeft: 8 }}
          onClick={handleCreateLog}
          disabled={!isStudying}
        >
          Dừng lại
        </Button>
      </div>
    </div>
  );
}

export default Tracker;