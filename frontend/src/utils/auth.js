// src/utils/auth.js

const TOKEN_KEY = "taxpal_token";

/**
 * Save JWT to localStorage
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get JWT from localStorage
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove token (logout)
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is logged in
 */
export const isAuthenticated = () => {
  return !!getToken();
};
