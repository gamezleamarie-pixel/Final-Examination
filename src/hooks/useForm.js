import { useState, useCallback } from 'react';
export default function useForm(initial = {}) {
  const [values, setValues] = useState(initial);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }, []);
  const reset = useCallback((next = initial) => setValues(next), [initial]);
  return { values, setValues, onChange, reset };
}