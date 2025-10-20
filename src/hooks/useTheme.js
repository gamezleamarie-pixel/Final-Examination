import { useState, useEffect, useCallback } from 'react';
const THEMES = {
  pink: {
    '--bg': '#fff0f6',
    '--card': '#fff5f9',
    '--primary': '#ff69b4',
    '--accent': '#ffb6c1',
    '--text': '#2d0a21'
  },
  blue: {
    '--bg': '#eaf2ff',
    '--card': '#f0f8ff',
    '--primary': '#0b3d91',
    '--accent': '#06326a',
    '--text': '#071738'
  }
};
export default function useTheme(initial = 'pink') {
  const [theme, setTheme] = useState(initial);
  useEffect(()=> {
    const t = THEMES[theme];
    if (!t) return;
    Object.keys(t).forEach(k => document.documentElement.style.setProperty(k, t[k]));
  }, [theme]);
  const toggle = useCallback(()=> setTheme(t => t === 'pink' ? 'blue' : 'pink'), []);
  return { theme, setTheme, toggle };
}
