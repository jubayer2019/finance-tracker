'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (authError) throw new Error(authError.message || 'Account registration failed');

      // Better Auth establishes the session cookie on sign-up.
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Get Started</h2>
          <p className="mt-2 text-sm text-slate-400">Initialize a sovereign tracking node</p>
        </div>
        {error && <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-400 border border-rose-500/20">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Legal Name</label>
              <input type="text" required className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none ring-offset-slate-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Email address</label>
              <input type="email" required className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none ring-offset-slate-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Security Password</label>
              <input type="password" required className="mt-1 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none ring-offset-slate-900 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition duration-150 active:scale-[0.98] disabled:opacity-50">
            {loading ? 'Instantiating...' : 'Build Free Workspace'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">Already registered? <Link href="/login" className="text-emerald-400 hover:underline">Execute access protocol</Link></p>
      </div>
    </div>
  );
}
