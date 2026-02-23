'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type CalmModeContextType = {
  isCalm: boolean;
  toggle: () => void;
};

const CalmModeContext = createContext<CalmModeContextType>({
  isCalm: false,
  toggle: () => {},
});

export function useCalmMode() {
  return useContext(CalmModeContext);
}

const STORAGE_KEY = 'joga-calm-mode';

export function CalmModeProvider({ children }: { children: React.ReactNode }) {
  const [isCalm, setIsCalm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      setIsCalm(true);
      document.body.classList.add('calm-mode');
    }
  }, []);

  const toggle = useCallback(() => {
    setIsCalm((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      if (next) {
        document.body.classList.add('calm-mode');
      } else {
        document.body.classList.remove('calm-mode');
      }
      return next;
    });
  }, []);

  return <CalmModeContext.Provider value={{ isCalm, toggle }}>{children}</CalmModeContext.Provider>;
}
