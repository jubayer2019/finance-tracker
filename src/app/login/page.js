'use client';
import { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Cpu, Lock, Mail, User, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. Google OAuth Authentication Pipeline
  const handleGoogleSocialAuth = async () => {
    setLoading(true);
    setError('');
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      });
    } catch (err) {
      setError(err.message || 'Google identity verification handshake failed.');
      setLoading(false);
    }
  };

  // 2. Standard Credentials Login Pipeline
  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard"
      });

      if (authError) throw new Error(authError.message || 'Invalid authorization credentials.');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 3. Custom Account Provisioning Pipeline
  const handleAccountRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
      });

      if (authError) throw new Error(authError.message || 'Registration structural validation failed.');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 selection:bg-emerald-400 selection:text-slate-900">
      
      {/* Background Matrix Decorative Flare */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md space-y-6">
        
        {/* Core System Branding Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/10">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 text-emerald-400">
              <Cpu className="h-6 w-6 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
            Fintech<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Engine</span>
          </h1>
          <p className="text-sm text-slate-400">
            {activeTab === 'login' ? 'Access your sovereign asset landscape' : 'Initialize a secure tracking node'}
          </p>
        </div>

        {/* Form Container Wrapper Sheet */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          
          {/* Custom Navigation Tab Mechanism */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800/60 mb-6">
            <button
              onClick={() => { setActiveTab('login'); setError(''); }}
              className={`rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'login' 
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/50' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); }}
              className={`rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'register' 
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/50' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Alert Display Layer */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
              <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-sm text-rose-300 font-medium">{error}</div>
            </div>
          )}

          {/* Social Single-Sign-On Platform Target */}
          <button
            onClick={handleGoogleSocialAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl text-sm font-bold text-slate-200 bg-slate-950 border border-slate-800 hover:bg-slate-900 hover:border-slate-700 transition duration-150 active:scale-[0.99] disabled:opacity-50"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-5 items-center text-xs font-mono text-slate-600 uppercase">
            <div className="flex-grow border-t border-slate-800/80"></div>
            <span className="flex-shrink mx-4">Or use secure link</span>
            <div className="flex-grow border-t border-slate-800/80"></div>
          </div>

          {/* Dynamic Forms System Routing */}
          <form onSubmit={activeTab === 'login' ? handleCredentialsLogin : handleAccountRegistration} className="space-y-4">
            
            {activeTab === 'register' && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-150">
                <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Operator Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Jubayer Khan Akash"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:text-slate-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="akash@finengine.io"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:text-slate-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Security Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-2 py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition duration-150 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing Request...
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

        {/* System Footnote Legal Guard */}
        <p className="text-center text-xs text-slate-600 font-mono uppercase tracking-widest">
          Encrypted Session Stream Security Architecture
        </p>
      </div>
    </div>
  );
}