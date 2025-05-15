const StudySchedule = ({ sessions, getSessionStatus }) => {
  return (
    <div className="study__progress">
      <h3>Lịch học hôm nay</h3>
      <ul className="study__sessions">
        {sessions.map((session) => {
          const status = getSessionStatus(session);
          let text = "";
          let iconStatus = "";
          if (status === "completed") {
            text = "✔ Đã học";
            iconStatus = "✔";
          } else if (status === "in_progress") {
            text = "⏳ Đang học";
            iconStatus = "⏳";
          } else {
            text = "🕗 Chưa bắt đầu";
            iconStatus = "🕗";
          }
          return (
            <li className="study__session" key={session.name}>
              <span>{session.icon}</span>
              <span>
                {session.name} ({session.start}:00 - {session.end}:00):{" "}
                <strong>
                  {iconStatus} {text}
                </strong>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudySchedule;