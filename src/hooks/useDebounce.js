import { useEffect, useState } from 'react';

// Small reusable hook to delay value updates for elastic search UX
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

