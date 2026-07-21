import { useState } from "react";
import members from "./data/members";
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

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">BanG Dream! 成员档案</h1>
        <p className="app-subtitle">超伟大对吧，十人十色</p>
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
        {activeTab === "chart" && <BarChartView members={members} />}
        {activeTab === "cards" && <CardGridView members={members} />}
        {activeTab === "calendar" && <CalendarView members={members} />}
        {activeTab === "today" && <TodayView members={members} />}
      </main>

      <BandLegend />
    </div>
  );
}
