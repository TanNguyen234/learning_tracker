const StudySummary = ({ totalDuration, progressPercent, completedLessons, totalLessons }) => {
  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h > 0 ? h + " giờ " : ""}${m} phút`;
  };

  return (
    <div className="study__summary">
      <h3>📊 Tổng kết</h3>
      <ul>
        <li>
          🕒 Tổng thời gian học: <strong>{formatDuration(totalDuration)}</strong>
        </li>
        <li>
          🚀 Tiến độ hoàn thành: <strong>{progressPercent}%</strong>
        </li>
        <li>
          📚 Bài đã hoàn thành: <strong>{completedLessons}/{totalLessons}</strong>
        </li>
      </ul>
    </div>
  );
};

export default StudySummary;