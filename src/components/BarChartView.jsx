import { useState, useCallback } from "react";
import { sortByHeight } from "../utils/helpers";
import "./BarChartView.css";

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

export default function BarChartView({ members }) {
  const [asc, setAsc] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sorted = sortByHeight(members, asc);
  const maxH = Math.max(...members.map((m) => m.height));

  const toggleSort = useCallback(() => {
    setAsc((prev) => !prev);
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <div className="barchart-view">
      <div className="barchart-controls">
        <button className="sort-btn active" onClick={toggleSort}>
          身高 {asc ? "↑ 低到高" : "↓ 高到低"}
        </button>
      </div>
      <div className="barchart-list" key={animKey}>
        {sorted.map((m, i) => (
          <div
            key={m.id}
            className="barchart-row"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <span className="barchart-rank">{i + 1}</span>
            <img
              className="barchart-avatar"
              src={m.avatar}
              alt={m.name}
            />
            <span className="barchart-name">{m.name}</span>
            <span className="barchart-band" style={{ color: bandColors[m.band] }}>
              {m.band}
            </span>
            <div className="barchart-bar-wrap">
              <div
                className="barchart-bar"
                style={{
                  width: `${(m.height / maxH) * 100}%`,
                  backgroundColor: bandColors[m.band],
                }}
              />
            </div>
            <span className="barchart-height">{m.height}cm</span>
          </div>
        ))}
      </div>
    </div>
  );
}
