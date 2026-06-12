'use client';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function TransactionForm({ onTransactionAdded }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, amount: Number(amount), type, category })
      });
      if (res.ok) {
        setTitle('');
        setAmount('');
        onTransactionAdded();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur-xl space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <PlusCircle className="h-5 w-5 text-emerald-400" /> Log Operation
      </h3>
      <div>
        <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Description</label>
        <input type="text" required placeholder="AWS Cloud Deployment" className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Amount (USD)</label>
          <input type="number" required placeholder="1450" className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Vector Path</label>
          <select className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense (-)</option>
            <option value="income">Income (+)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Category Tag</label>
        <select className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-emerald-500" value={category} onChange={(e) => setCategory(e.target.value)}>
          {['Salary', 'Freelance', 'Investments', 'Food', 'Rent', 'Utilities', 'Entertainment', 'Other'].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition duration-150 active:scale-[0.99]">
        {loading ? 'Committing Log...' : 'Commit Core Record'}
      </button>
    </form>
  );
}