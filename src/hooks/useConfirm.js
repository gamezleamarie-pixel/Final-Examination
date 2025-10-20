import { useCallback } from 'react';

/**
 * Custom hook for simple confirmation dialogs.
 * Returns an object with confirm function.
 */
export default function useConfirm() {
  const confirm = useCallback((message, onConfirm) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, []);

  return { confirm };
}