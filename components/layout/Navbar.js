import { useState, useEffect } from "react";

/**
 * Top navigation bar with dark mode toggle
 */
export default function Navbar() {
  const [dark, setDark] = useState(false);

  /**
   * Load saved theme on mount
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  /**
   * Toggle dark/light mode
   */
  const toggleTheme = () => {
    const newTheme = !dark;

    setDark(newTheme);

    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div style={styles.navbar}>
      <h3>Dashboard</h3>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        
        {/* Dark mode toggle */}
        <button className="btn" onClick={toggleTheme}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Optional profile placeholder */}
        <button className="btn btn-primary">
          Profile
        </button>

      </div>
    </div>
  );
}

/**
 * Navbar styles
 */
const styles = {
  navbar: {
    height: "60px",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #eee",
    position: "sticky",
    top: 0,
    zIndex: 100
  }
};