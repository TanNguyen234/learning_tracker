import { Button, Typography } from "antd";
import { useEffect, useState } from "react";
import { createLog } from "../../services/log";

const { Text } = Typography;

function Tracker(probs) {
  const { skill, user } = probs;
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
    if (!startTime) return;

    const durationInMinutes = Math.floor((end - startTime) / 60000); // convert ms to minutes
    try {
      const logData = {
        skill_id: skill.id,
        start_time: startTime.toISOString(),
        end_time: end.toISOString(),
        duration: durationInMinutes,
        note: "Chưa làm",
      };
      console.log(logData)

      // const newLog = await createLog(logData, user.access_token)
    } catch (error) {
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
          onClick={() => handleCreateLog()}
          disabled={!isStudying}
        >
          Dừng lại
        </Button>
      </div>
    </div>
  );
}

export default Tracker;
