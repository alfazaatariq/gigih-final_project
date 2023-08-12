import { useEffect, useState } from 'react';

const useDebounce = (input: string, delay: number) => {
  const [inputValue, setInputValue] = useState(input);
  useEffect(() => {
    const handler = setTimeout(() => {
      setInputValue(input);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [input, delay]);

  return inputValue;
};

export default useDebounce;
