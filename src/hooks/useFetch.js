import { useState, useCallback } from 'react';
export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exec = useCallback(async (fn, ...args) => {
    setLoading(true); setError(null);
    try {
      const res = await fn(...args);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exec, loading, error };
}