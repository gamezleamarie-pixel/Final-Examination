import { useMemo } from 'react';
export default function useSearchFilter(list = [], q = '') {
  return useMemo(() => {
    if (!q) return list;
    const s = q.toLowerCase();
    return list.filter(item =>
      (item.customer_name || '').toLowerCase().includes(s) ||
      (item.room_number || '').toLowerCase().includes(s)
    );
  }, [list, q]);
}
