'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

export default function RootPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (session) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [session, isPending, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
    </div>
  );
}
