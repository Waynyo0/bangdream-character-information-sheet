import { formatBirthday } from "../utils/helpers";
import "./BirthdayModal.css";

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
