'use client';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AnalyticsChart({ transactions }) {
  const now = new Date();
  const currentMonthTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  const categories = {};
  let totalExpense = 0;

  currentMonthTransactions.forEach(t => {
    if (t.type === 'expense') {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
      totalExpense += t.amount;
    }
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Structural Analytics</h3>
          <p className="text-xs text-slate-400">Expense breakdown by operational category</p>
        </div>
        <TrendingUp className="h-5 w-5 text-emerald-400" />
      </div>

      <div className="mt-6 space-y-4">
        {Object.keys(categories).length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-500">No telemetry logged for current month framework</div>
        ) : (
          Object.entries(categories).map(([category, amount]) => {
            const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(0) : 0;
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-300">{category}</span>
                  <span className="font-mono text-slate-400">${amount.toLocaleString()} ({percentage}%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-950">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}