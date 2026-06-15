'use client';
import { useState, useEffect, useCallback } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import AnalyticsChart from '../components/AnalyticsChart';
import BudgetWidget from '../components/BudgetWidget';
import { Wallet, ArrowDownRight, ArrowUpRight } from 'lucide-react';

// ⚠️ Forces Next.js to render this page dynamically, bypassing static build-time auth checks
export const dynamic = 'force-dynamic';

import { authClient } from "@/lib/auth-client";
// ... the rest of your dashboard code ...

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalBalance: 0, totalIncome: 0, totalExpenses: 0 });
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardTelemetry = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const [transRes, sumRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/summary/analytics`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (transRes.ok && sumRes.ok) {
        const transData = await transRes.json();
        const sumData = await sumRes.json();
        setTransactions(transData);
        setSummary(sumData);
      }
    } catch (err) {
      console.error('Error fetching dashboard telemetry:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const activeUser = localStorage.getItem('user');
    if (activeUser) {
      try {
        const parsed = JSON.parse(activeUser);
        if (parsed.monthlyBudget) setBudget(parsed.monthlyBudget);
      } catch (e) {
        console.error('Error parsing active user layout:', e);
      }
    }
    fetchDashboardTelemetry();
  }, [fetchDashboardTelemetry]);

  if (loading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">Synchronizing ledger stream...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Liquid Valuation</p>
            <h4 className="mt-2 text-3xl font-mono font-black text-white">${summary.totalBalance.toLocaleString()}</h4>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><Wallet className="h-6 w-6" /></div>
        </div>
        <div className="grid rounded-2xl border border-slate-800 bg-slate-900/20 p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Income</p>
            <h4 className="mt-2 text-3xl font-mono font-black text-emerald-400">${summary.totalIncome.toLocaleString()}</h4>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20"><ArrowUpRight className="h-6 w-6" /></div>
        </div>
        <div className="grid rounded-2xl border border-slate-800 bg-slate-900/20 p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Expense Attrition</p>
            <h4 className="mt-2 text-3xl font-mono font-black text-rose-400">${summary.totalExpenses.toLocaleString()}</h4>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20"><ArrowDownRight className="h-6 w-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <TransactionForm onTransactionAdded={fetchDashboardTelemetry} />
          <BudgetWidget currentExpenses={summary.totalExpenses} initialBudget={budget} onBudgetUpdated={(val) => setBudget(val)} />
        </div>
        <div className="space-y-8 lg:col-span-2">
          <AnalyticsChart transactions={transactions} />
          <TransactionTable transactions={transactions} onDeleteSuccess={fetchDashboardTelemetry} />
        </div>
      </div>
    </div>
  );
}