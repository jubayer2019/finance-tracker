import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

/**
 * Income vs Expense chart
 */
export default function Charts({ data }) {
  return (
    <div className="card">
      <h3>Monthly Overview</h3>

      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#22c55e" />
        <Bar dataKey="expense" fill="#ef4444" />
      </BarChart>
    </div>
  );
}