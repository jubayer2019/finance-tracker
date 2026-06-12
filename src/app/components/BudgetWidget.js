'use client';
import { useState } from 'react';
import { Sliders } from 'lucide-react';

export default function BudgetWidget({ currentExpenses, initialBudget, onBudgetUpdated }) {
  const [budget, setBudget] = useState(initialBudget || 0);
  const [editing, setEditing] = useState(false);

  const saveBudget = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/budget`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ monthlyBudget: Number(budget) })
      });
      if (res.ok) {
        setEditing(false);
        if (onBudgetUpdated) onBudgetUpdated(Number(budget));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const percentUsed = budget > 0 ? Math.min(((currentExpenses / budget) * 100), 100).toFixed(0) : 0;
  const isOver = currentExpenses > budget && budget > 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2"><Sliders className="h-5 w-5 text-emerald-400" /> Budget Safeguard</h3>
        {editing ? (
          <button onClick={saveBudget} className="text-xs bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded-md">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="text-xs text-slate-400 hover:text-white transition">Modify Threshold</button>
        )}
      </div>

      {editing ? (
        <input type="number" className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-white" value={budget} onChange={(e) => setBudget(e.target.value)} />
      ) : (
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-mono font-black text-white">${currentExpenses.toLocaleString()}</span>
            <span className="text-xs text-slate-400">of ${budget.toLocaleString()} cap allocation</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-950 border border-slate-800/50">
            <div className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-rose-500' : 'bg-emerald-400'}`} style={{ width: `${percentUsed}%` }} />
          </div>
          <p className={`text-xs font-semibold ${isOver ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`}>
            {isOver ? 'CRITICAL METRIC: Outflows breach budget allocation.' : `${percentUsed}% of strict metric ceiling consumed.`}
          </p>
        </div>
      )}
    </div>
  );
}