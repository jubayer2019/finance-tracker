'use client';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";
import Navbar from '../components/Navbar';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  // Live reactive data framework hooks tracking server cookie sessions
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    router.replace('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar user={session.user} />
      <main className="flex-1 mx-auto w-full max-w-7xl p-4 md:p-8 space-y-8">
        {children}
      </main>
    </div>
  );
}