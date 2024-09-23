import { useState, useEffect } from 'react';

const IsDarkMode = () => {
  const [isDarkMode,setDarkMode] = useState(document.documentElement.getAttribute('data-theme') === 'dark');

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setDarkMode(theme === 'dark');
    };

    // check theme when the component mounts
    checkTheme();

    // dynamically detect theme changes
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;

};

export default IsDarkMode;