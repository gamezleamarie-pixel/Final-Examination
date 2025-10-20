import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useBookings(search="") {
  const [bookings, setBookings] = useState([]);
  const load = useCallback(async (q = search) => {
    const data = await api.fetchBookings(q);
    setBookings(Array.isArray(data) ? data : []);
  }, [search]);
  useEffect(()=> { load(search); }, [load, search]);
  return { bookings, reload: load };
}