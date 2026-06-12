/**
 * Transaction Table Component
 * Handles list + empty state UI
 */

export default function TransactionTable({ transactions, onDelete }) {
  /**
   * EMPTY STATE UI
   */
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card">
        <h3>No transactions yet</h3>
        <p>
          Start tracking your income and expenses by adding your first transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Transactions</h3>

      <table width="100%" cellPadding="8">
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td style={{ color: t.type === "income" ? "green" : "red" }}>
                {t.type}
              </td>

              <td>{t.amount}</td>
              <td>{t.category}</td>

              <td>
                <button
                  onClick={() => onDelete(t._id)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "6px"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}