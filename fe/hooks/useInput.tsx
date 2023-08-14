import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim());
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
