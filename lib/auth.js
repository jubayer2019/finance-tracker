import { useRouter } from "next/router";

/**
 * Save JWT token
 */
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Get token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

/**
 * Check authentication
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};