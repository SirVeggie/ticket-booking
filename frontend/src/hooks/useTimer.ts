import { useState } from 'react';

export function useTimer() {
    const [timer, setTimer] = useState(null as any);
  
    const start = (duration: number, action: () => void | Promise<any>) => {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        action();
      }, duration));
    };
  
    const clear = () => {
      clearTimeout(timer);
    };
  
    return { start, clear };
  }