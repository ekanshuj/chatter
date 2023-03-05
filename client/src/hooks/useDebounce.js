import React, { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debounceVal, setDebounceVal] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value)
    }, delay);
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]);
  return debounceVal
};

export default useDebounce;