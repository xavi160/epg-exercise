import { useEffect, useState } from 'react';

function useInterval(delay: number | null) {
  const [, setState] = useState(0);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => setState((state) => state + 1), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
