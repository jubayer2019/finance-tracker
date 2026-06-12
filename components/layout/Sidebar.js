import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Sidebar with active route highlighting
 */
export default function Sidebar() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <div style={styles.sidebar}>
      <h2>Finance</h2>

      <Link
        href="/dashboard"
        className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}
      >
        Dashboard
      </Link>

      <Link href="#" className="sidebar-link">
        Transactions
      </Link>

      <Link href="#" className="sidebar-link">
        Analytics
      </Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#fff",
    padding: "20px",
    borderRight: "1px solid #eee"
  }
};