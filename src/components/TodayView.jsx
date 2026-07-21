import { useState, useEffect } from "react";
import { formatBirthday } from "../utils/helpers";
import "./TodayView.css";

const bandColors = {
  "Poppin'Party": "#c46a82",
  Afterglow: "#c46262",
  "Pastel*Palettes": "#62a88a",
  Roselia: "#6270a8",
  "Hello, Happy World!": "#c49a42",
  Morfonica: "#8e62b8",
  "RAISE A SUILEN": "#52a094",
  "MyGO!!!!!": "#628ab8",
  "Ave Mujica": "#7562a0",
  "梦限大MewType": "#c47e52",
};

export default function TodayView() {
  const [todayMembers, setTodayMembers] = useState([]);
  const [nextBirthday, setNextBirthday] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/members/birthdays/today").then((r) => r.json()),
      fetch("/api/members/birthdays/next").then((r) => r.json()),
    ])
      .then(([today, next]) => {
        setTodayMembers(today);
        setNextBirthday(next);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = new Date();

  if (loading) {
    return <div className="status-msg">加载中…</div>;
  }

  return (
    <div className="today-view">
      <div className="today-card">
        <h2 className="today-card-title">
          今日生日 · {today.getMonth() + 1}月{today.getDate()}日
        </h2>
        {todayMembers.length > 0 ? (
          <div className="today-members">
            {todayMembers.map((m) => (
              <div key={m.id} className="today-member-row">
                <img className="today-avatar" src={m.avatar} alt={m.name} />
                <div className="today-info">
                  <div className="today-name">{m.name}</div>
                  <div className="today-band" style={{ color: bandColors[m.band] }}>
                    {m.band}
                  </div>
                </div>
                <div className="today-badge">🎂</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="today-empty">今日无角色生日</div>
        )}
      </div>

      <div className="next-card">
        <h2 className="next-card-title">距离下一次生日</h2>
        {nextBirthday ? (
          <div className="next-content">
            <img
              className="next-avatar"
              src={nextBirthday.member.avatar}
              alt={nextBirthday.member.name}
            />
            <div className="next-info">
              <div className="next-name">{nextBirthday.member.name}</div>
              <div className="next-band" style={{ color: bandColors[nextBirthday.member.band] }}>
                {nextBirthday.member.band}
              </div>
              <div className="next-date">
                {formatBirthday(nextBirthday.member.month, nextBirthday.member.day)}
              </div>
            </div>
            <div className="next-countdown">
              <span className="next-days">{nextBirthday.days}</span>
              <span className="next-label">天后</span>
            </div>
          </div>
        ) : (
          <div className="today-empty">暂无数据</div>
        )}
      </div>
    </div>
  );
}
