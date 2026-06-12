import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Ensure this points directly to your API root, Better Auth appends /auth internally
  baseURL: process.env.NEXT_PUBLIC_API_URL 
});