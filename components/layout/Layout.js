import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * Main dashboard layout wrapper
 */
export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}