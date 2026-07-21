import { useState } from "react";
import { sortByHeight, sortByBirthday, formatBirthday } from "../utils/helpers";
import "./MemberCard.css";

const bandColors = {
  "Poppin'Party": "#FF4499",
  Afterglow: "#EE3344",
  "Pastel*Palettes": "#44DDAA",
  Roselia: "#3355BB",
  "Hello, Happy World!": "#FFBB11",
  Morfonica: "#AA44DD",
  "RAISE A SUILEN": "#33CCCC",
  "MyGO!!!!!": "#4488CC",
  "Ave Mujica": "#7744AA",
  "梦限大MewType": "#FF6633",
};

export default function MemberCard({ member }) {
  return (
    <div className="member-card" style={{ borderColor: bandColors[member.band] }}>
      <div className="member-card-band" style={{ backgroundColor: bandColors[member.band] }}>
        {member.band}
      </div>
      <img
        className="member-card-avatar"
        src={member.avatar}
        alt={member.name}
      />
      <div className="member-card-name">{member.name}</div>
      <div className="member-card-info">
        <span className="member-card-height">{member.height}cm</span>
        <span className="member-card-sep">|</span>
        <span className="member-card-birthday">{formatBirthday(member.month, member.day)}</span>
      </div>
    </div>
  );
}

const BANDS = Object.keys(bandColors);

export function CardGridView({ members }) {
  const [sortMode, setSortMode] = useState("height");
  const [asc, setAsc] = useState(false);
  const [bandFilter, setBandFilter] = useState("全选");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered =
    bandFilter === "全选"
      ? members
      : members.filter((m) => m.band === bandFilter);

  const sorted =
    sortMode === "height"
      ? sortByHeight(filtered, asc)
      : sortByBirthday(filtered, asc);

  return (
    <div className="cardgrid-view">
      <div className="cardgrid-controls">
        <div
          className="band-dropdown"
          tabIndex={0}
          onBlur={() => setDropdownOpen(false)}
        >
          <button
            className="band-dropdown-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {bandFilter}
            <span className="band-dropdown-arrow">▾</span>
          </button>
          {dropdownOpen && (
            <div className="band-dropdown-menu">
              <div
                className={`band-dropdown-item ${bandFilter === "全选" ? "selected" : ""}`}
                onMouseDown={() => { setBandFilter("全选"); setDropdownOpen(false); }}
              >
                全选
              </div>
              {BANDS.map((band) => (
                <div
                  key={band}
                  className={`band-dropdown-item ${bandFilter === band ? "selected" : ""}`}
                  onMouseDown={() => { setBandFilter(band); setDropdownOpen(false); }}
                >
                  <span
                    className="band-dropdown-dot"
                    style={{ backgroundColor: bandColors[band] }}
                  />
                  {band}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="sort-group">
          <button
            className={`sort-btn ${sortMode === "height" ? "active" : ""}`}
            onClick={() => {
              if (sortMode === "height") setAsc(!asc);
              else { setSortMode("height"); setAsc(false); }
            }}
          >
            按身高 {sortMode === "height" ? (asc ? "↑" : "↓") : ""}
          </button>
          <button
            className={`sort-btn ${sortMode === "birthday" ? "active" : ""}`}
            onClick={() => {
              if (sortMode === "birthday") setAsc(!asc);
              else { setSortMode("birthday"); setAsc(true); }
            }}
          >
            按生日 {sortMode === "birthday" ? (asc ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>
      <div className="cardgrid-grid">
        {sorted.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </div>
  );
}
