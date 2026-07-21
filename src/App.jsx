import { useState, useEffect } from "react";
import BarChartView from "./components/BarChartView";
import { CardGridView } from "./components/CardGridView";
import CalendarView from "./components/CalendarView";
import TodayView from "./components/TodayView";
import BandLegend from "./components/BandLegend";
import "./App.css";

const TABS = [
  { key: "today", label: "🎂 今日" },
  { key: "chart", label: "📊 身高" },
  { key: "cards", label: "🃏 排行" },
  { key: "calendar", label: "📅 日历" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">BanG Dream! 成员档案</h1>
        <p className="app-subtitle">10支乐队 · 50名角色</p>
      </header>

      <nav className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {loading && (
          <div className="status-msg">加载中…</div>
        )}
        {error && (
          <div className="status-msg status-error">加载失败：{error}</div>
        )}
        {!loading && !error && (
          <>
            {activeTab === "chart" && <BarChartView members={members} />}
            {activeTab === "cards" && <CardGridView members={members} />}
            {activeTab === "calendar" && <CalendarView members={members} />}
            {activeTab === "today" && <TodayView />}
          </>
        )}
      </main>

      {!loading && !error && <BandLegend />}
    </div>
  );
}
