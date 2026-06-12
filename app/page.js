"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasToken = !!localStorage.getItem("token");
    router.replace(hasToken ? "/dashboard" : "/login");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>Opening your Personal Finance Tracker...</p>
    </main>
  );
}
