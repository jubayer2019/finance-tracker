import { saveAs } from "file-saver";

/**
 * Export transactions as CSV file
 */
export const exportCSV = (data) => {
  const header = "Type,Amount,Category,Date\n";

  const rows = data
    .map((t) => `${t.type},${t.amount},${t.category},${t.createdAt}`)
    .join("\n");

  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });

  saveAs(blob, "transactions.csv");
};