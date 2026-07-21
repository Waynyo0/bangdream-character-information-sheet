import { useState } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getMembersByDate,
  MONTH_NAMES,
} from "../utils/helpers";
import BirthdayModal from "./BirthdayModal";
import "./CalendarView.css";

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

export default function CalendarView({ members }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDate(null);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const handleDateClick = (day) => {
    const membersOnDate = getMembersByDate(members, month + 1, day);
    if (membersOnDate.length > 0) {
      setSelectedDate({ month: month + 1, day, members: membersOnDate });
      setModalOpen(true);
    }
  };

  return (
    <div className="calendar-view">
      <div className="calendar-nav">
        <button className="calendar-nav-btn" onClick={prevMonth}>
          ←
        </button>
        <h2 className="calendar-title">
          {year}年 {MONTH_NAMES[month]}
        </h2>
        <button className="calendar-nav-btn" onClick={nextMonth}>
          →
        </button>
      </div>

      <div className="calendar-grid">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}
        {days.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="calendar-day empty" />;
          }

          const dateMembers = getMembersByDate(members, month + 1, day);
          const hasBirthday = dateMembers.length > 0;

          return (
            <div
              key={day}
              className={`calendar-day ${hasBirthday ? "has-birthday" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              <span className="calendar-day-num">{day}</span>
              {hasBirthday && (
                <div className="calendar-dots">
                  {dateMembers.map((m) => (
                    <span
                      key={m.id}
                      className="calendar-dot"
                      style={{ backgroundColor: bandColors[m.band] }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {modalOpen && selectedDate && (
        <BirthdayModal
          members={selectedDate.members}
          month={selectedDate.month}
          day={selectedDate.day}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
