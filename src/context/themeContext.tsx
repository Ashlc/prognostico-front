import { createContext, ReactNode, useEffect, useState } from 'react';

// Define the shape of the context value
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

type Props = {
  children: ReactNode;
};

// Create the context
export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

// Create a provider component
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(() => {
    // Retrieve the saved theme from local storage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Dynamically import the correct CSS file based on the theme
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.id = 'theme-css';

    const existingLink = document.getElementById('theme-css');
    if (existingLink) {
      existingLink.remove();
    }

    themeLink.href =
      theme === 'dark' ? '/themes/theme-dark.css' : '/themes/theme-light.css';
    document.head.appendChild(themeLink);

    // Save the theme preference to local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Create the context value
  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
