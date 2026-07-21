import "./BandLegend.css";

const bands = [
  { name: "Poppin'Party", color: "#FF4499" },
  { name: "Afterglow", color: "#EE3344" },
  { name: "Pastel*Palettes", color: "#44DDAA" },
  { name: "Roselia", color: "#3355BB" },
  { name: "Hello, Happy World!", color: "#FFBB11" },
  { name: "Morfonica", color: "#AA44DD" },
  { name: "RAISE A SUILEN", color: "#33CCCC" },
  { name: "MyGO!!!!!", color: "#4488CC" },
  { name: "Ave Mujica", color: "#7744AA" },
  { name: "梦限大MewType", color: "#FF6633" },
];

export default function BandLegend() {
  return (
    <div className="band-legend">
      {bands.map((b) => (
        <div key={b.name} className="band-legend-item">
          <span
            className="band-legend-dot"
            style={{ backgroundColor: b.color }}
          />
          <span className="band-legend-name">{b.name}</span>
        </div>
      ))}
    </div>
  );
}
