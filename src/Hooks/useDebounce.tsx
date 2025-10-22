// contoh

import { useState, useEffect } from "react";

/**
 * Hook untuk debounce nilai (misalnya input search).
 * Hanya mengembalikan value setelah tidak ada perubahan selama delay tertentu.
 *
 * @param value Nilai yang akan di-debounce
 * @param delay Delay dalam ms (default 500)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // cleanup jika value berubah sebelum delay selesai
    };
  }, [value, delay]);

  return debouncedValue;
}