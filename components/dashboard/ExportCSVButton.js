/**
 * Export CSV Button Component
 */

import { exportCSV } from "../../utils/exportCSV";

/**
 * Button to export transactions as CSV
 */
export default function ExportCSVButton({ transactions }) {
  return (
    <button
      className="btn-primary"
      onClick={() => exportCSV(transactions)}
    >
      Export CSV
    </button>
  );
}