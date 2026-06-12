import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../../lib/auth";

/**
 * Protect pages from unauthenticated access
 */
export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, []);

  return children;
}