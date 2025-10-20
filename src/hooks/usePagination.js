import { useState, useCallback } from 'react';
export default function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const next = useCallback(()=> setPage(p => p + 1), []);
  const prev = useCallback(()=> setPage(p => Math.max(1, p - 1)), []);
  return { page, limit, setLimit, next, prev, setPage };
}