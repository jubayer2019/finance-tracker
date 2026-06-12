export default function StatsCard({ title, value, color }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}