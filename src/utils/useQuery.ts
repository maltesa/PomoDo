import { useEffect, useState } from "react";

export function useQuery<T>(query: () => Promise<T>, deps: any[]) {
  const [result, setResult] = useState<T>();

  // FIXME: use AbortController
  useEffect(() => {
    const callQuery = async () => {
      const r = await query();
      setResult(r);
    };

    callQuery();
  }, deps);

  return result;
}
