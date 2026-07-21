import { formatBirthday } from "../utils/helpers";
import "./BirthdayModal.css";

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

export default function BirthdayModal({ members, month, day, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h3 className="modal-title">{formatBirthday(month, day)} 生日</h3>
        <div className="modal-members">
          {members.map((m) => (
            <div key={m.id} className="modal-member">
              <img
                className="modal-avatar"
                src={m.avatar}
                alt={m.name}
              />
              <div className="modal-info">
                <div className="modal-name">{m.name}</div>
                <div
                  className="modal-band"
                  style={{ color: bandColors[m.band] }}
                >
                  {m.band}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
