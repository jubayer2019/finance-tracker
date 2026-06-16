'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";
import { Cpu, Lock, Mail, User, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. Fixed Google Social Login
  const handleGoogleSocialAuth = async () => {
    setLoading(true);
    setError('');
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      });
    } catch (err) {
      setError(err.message || 'Google verification failed.');
      setLoading(false); // Reset immediately if initialization fails
    }
    // Note: If successful, the page redirects, so loading stays true until unmount
  };

  // 2. Fixed Credentials Login with Finally Block
  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      });
      if (authError) throw new Error(authError.message || 'Invalid credentials.');
      // Email/password sign-in does not auto-redirect, so navigate manually
      // and refresh so the new session cookie is picked up server-side.
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Fixed Registration with Finally Block
  const handleAccountRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
      });
      if (authError) throw new Error(authError.message || 'Registration failed.');
      // Better Auth signs the user in on successful sign-up; go to the dashboard.
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... Keeping your beautiful Tailwind layout intact ...
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="relative w-full max-w-md space-y-6 z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg">
            <Cpu className="h-6 w-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
            Fintech<span className="text-emerald-400">Engine</span>
          </h1>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 bg-opacity-40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
            <button type="button" onClick={() => { setActiveTab('login'); setError(''); }} className={`rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeTab === 'login' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'}`}>Sign In</button>
            <button type="button" onClick={() => { setActiveTab('register'); setError(''); }} className={`rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeTab === 'register' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-slate-200'}`}>Register</button>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-rose-950 bg-opacity-50 border border-rose-500/20 p-4 mb-6">
              <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-sm text-rose-300 font-medium">{error}</div>
            </div>
          )}

          <button type="button" onClick={handleGoogleSocialAuth} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-950 border border-slate-800 hover:bg-slate-900 transition duration-150 disabled:opacity-50">
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-5 items-center text-xs font-mono text-slate-600 uppercase">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4">Or use secure credentials</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <form onSubmit={activeTab === 'login' ? handleCredentialsLogin : handleAccountRegistration} className="space-y-4 text-left">
            {activeTab === 'register' && (
              <div>
                <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Operator Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input type="text" required placeholder="Jubayer Khan Akash" className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type="email" required placeholder="akash@finengine.io" className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Security Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input type="password" required placeholder="••••••••••••" className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-emerald-500 transition" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 mt-2 py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition duration-150 disabled:opacity-50">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {activeTab === 'login' ? 'Execute Access Authorization' : 'Initialize Workspace Node'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
