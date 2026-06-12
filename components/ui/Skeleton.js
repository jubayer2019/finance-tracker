export default function Skeleton({ height = 20, width = "100%" }) {
  return (
    <div
      style={{
        height,
        width,
        background: "#e5e7eb",
        borderRadius: "8px",
        marginBottom: "10px",
        animation: "pulse 1.5s infinite"
      }}
    />
  );
}