
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getLocale, setLocale, Locale } from './i18n';

type ThemeType = 'light' | 'dark';

interface AppContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  locale: Locale;
  setAppLocale: (locale: Locale) => void;
}

const AppContext = createContext<AppContextType>({
  theme: 'light',
  toggleTheme: () => {},
  locale: 'en',
  setAppLocale: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
  });

  // Initialize locale from localStorage or default to 'en'
  const [locale, setAppLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    return savedLocale === 'de' ? 'de' : 'en';
  });

  // Apply theme to document when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Update locale when it changes
  useEffect(() => {
    setLocale(locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, locale, setAppLocale }}>
      {children}
    </AppContext.Provider>
  );
};
