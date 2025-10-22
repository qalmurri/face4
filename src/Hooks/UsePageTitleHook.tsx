import { useEffect } from "react";

export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Projek 2025`;
  }, [title]);
}
