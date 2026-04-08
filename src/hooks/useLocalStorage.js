// hooks/useLocalStorage.js
// Custom React hook — persists state in localStorage automatically

import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Initialize: read from localStorage if available, else use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('useLocalStorage read error:', error);
      return initialValue;
    }
  });

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('useLocalStorage write error:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
