'use client';
import { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard" // Redirects safely on verification success
      });
    } catch (err) {
      setError(err.message || 'Google OAuth failed to initialize');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-400">Access your ledger workspace node</p>
        </div>

        {error && (
          <div className="rounded-lg bg-rose-500/10 p-3 text-sm text-rose-400 border border-rose-500/20">
            {error}
          </div>
        )}

        {/* Action Button Triggering Better Auth Pipeline */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-800 rounded-xl text-sm font-bold text-white bg-slate-950 hover:bg-slate-900 transition duration-150 active:scale-[0.98] disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
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
          {loading ? 'Initializing Stream...' : 'Continue with Google'}
        </button>

        <p className="text-center text-xs text-slate-600 font-mono uppercase">
          Managed by corporate single sign-on infrastructure
        </p>
      </div>
    </div>
  );
}