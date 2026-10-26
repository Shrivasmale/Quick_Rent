// frontend/src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

/**
 * Hook strictly reserved for client UI preferences (e.g. search filters, display mode).
 * Never store auth tokens, credentials, or sensitive data in localStorage.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage failed to write key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
