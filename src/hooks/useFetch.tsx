import { useEffect, useState } from "react";

/**
 * Hook untuk fetch data dari API.
 * Mengembalikan state: data, error, loading.
 *
 * @param url Endpoint API
 * @param options Fetch options (opsional)
 */
export function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    fetch(url, options)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const json = (await res.json()) as T;
        if (isMounted) {
          setData(json);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err as Error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, loading };
}