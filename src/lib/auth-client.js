import { createAuthClient } from "better-auth/react";

// Points at the API server root. Better Auth automatically appends "/api/auth"
// to this base URL. Set NEXT_PUBLIC_API_URL to your deployed server origin,
// e.g. https://finance-tracker-server-eta.vercel.app
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
