'use client';
import { useRouter } from 'next/navigation';
import { LogOut, ShieldCheck, Cpu } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Cpu className="h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">FINTECH<span className="text-emerald-400">ENGINE</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 rounded-lg bg-slate-950 px-3 py-1.5 border border-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono tracking-wider text-slate-400">SECURE NODE ACTIVE</span>
          </div>
          <button onClick={handleLogout} className="flex items-center space-x-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition duration-150">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Disconnect</span>
          </button>
        </div>
      </div>
    </nav>
  );
}