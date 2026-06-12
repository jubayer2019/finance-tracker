'use client';
import { Trash2, FileSpreadsheet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TransactionTable({ transactions, onDeleteSuccess }) {
  const handleDelete = async (id) => {
    if (!confirm('Purge structural ledger entry permanently?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) onDeleteSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Title,Amount,Type,Category,Date\n'];
    const rows = transactions.map(t => `${t.title},${t.amount},${t.type},${t.category},${new Date(t.date).toLocaleDateString()}`);
    const blob = new Blob([...headers, rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/30 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 p-6">
        <div>
          <h3 className="text-lg font-bold text-white">Ledger Audits</h3>
          <p className="text-xs text-slate-400">Comprehensive real-time telemetry array</p>
        </div>
        <button onClick={exportToCSV} className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800 px-4 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-400/5 transition">
          <FileSpreadsheet className="h-4 w-4" /> Export Ledger CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/40 text-xs font-semibold tracking-wider text-slate-400 uppercase border-b border-slate-800">
              <th className="p-4">Transaction Details</th>
              <th className="p-4">Context Category</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4 text-right">Value Mapping</th>
              <th className="p-4 text-center">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-slate-500">System registers null transaction streams</td>
              </tr>
            ) : (
              transactions.map(t => (
                <tr key={t._id} className="hover:bg-slate-900/20 transition">
                  <td className="p-4 font-semibold text-white flex items-center gap-2">
                    {t.type === 'income' ? <ArrowUpRight className="h-4 w-4 text-emerald-400" /> : <ArrowDownRight className="h-4 w-4 text-rose-400" />}
                    {t.title}
                  </td>
                  <td className="p-4 text-slate-300"><span className="rounded-md bg-slate-950 border border-slate-800 px-2 py-1 text-xs">{t.category}</span></td>
                  <td className="p-4 text-slate-400 font-mono">{new Date(t.date).toLocaleDateString()}</td>
                  <td className={`p-4 text-right font-mono font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleDelete(t._id)} className="text-slate-500 hover:text-rose-400 transition p-1 rounded-lg hover:bg-rose-500/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}