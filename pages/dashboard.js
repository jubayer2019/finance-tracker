import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../lib/api";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import ExportCSVButton from "../components/dashboard/ExportCSVButton";

import StatsCard from "../components/dashboard/StatsCard";
import Charts from "../components/dashboard/Charts";
import TransactionTable from "../components/dashboard/TransactionTable";
import AddTransactionModal from "../components/dashboard/AddTransactionModal";
import ProtectedRoute from "../components/auth/ProtectedRoute";

/**
 * Dashboard Page
 */
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch dashboard data
   */
  const fetchData = async () => {
    try {
      setLoading(true);

      const [t, s] = await Promise.all([
        api.get("/transactions"),
        api.get("/transactions/summary/monthly")
      ]);

      setTransactions(t.data);
      setSummary(s.data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Delete transaction
   */
  const deleteTxn = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      toast.success("Transaction deleted");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /**
   * LOADING STATE UI
   */
  if (loading) {
    return (
      <Layout>
        <div className="card">
          <h3>Loading dashboard...</h3>
          <p>Please wait while we fetch your financial data.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

            {/* Add Transaction Button */}
            <Button onClick={() => setOpen(true)}>
            + Add Transaction
            </Button>

            {/* Export CSV Button */}
            <ExportCSVButton transactions={transactions} />

        </div>

      <br />

      {/* STATS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <StatsCard title="Income" value="৳60,000" color="green" />
        <StatsCard title="Expense" value="৳15,000" color="red" />
        <StatsCard title="Balance" value="৳45,000" color="blue" />
      </div>

      <br />

      {/* CHARTS */}
      <Charts data={summary} />

      <br />

      {/* TABLE */}
      <TransactionTable
        transactions={transactions}
        onDelete={deleteTxn}
      />

      {/* MODAL */}
      {open && (
        <AddTransactionModal
          onClose={() => setOpen(false)}
          refresh={fetchData}
        />
      )}
    </Layout>
  );
    return (
        <ProtectedRoute>
        <Layout>
        {/* existing dashboard code */}
        </Layout>
        </ProtectedRoute>
    );
}