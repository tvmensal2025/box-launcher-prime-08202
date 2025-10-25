import React, { useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useAdmin();

  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar cores do tema
    root.style.setProperty('--primary', settings.theme.primaryColor);
    root.style.setProperty('--secondary', settings.theme.secondaryColor);
    root.style.setProperty('--accent', settings.theme.accentColor);
    root.style.setProperty('--background', settings.theme.backgroundColor);
    root.style.setProperty('--foreground', settings.theme.textColor);
    root.style.setProperty('--card', settings.theme.cardColor);
    
    // Aplicar cores do banner
    if (settings.banner.enabled) {
      root.style.setProperty('--banner-bg', settings.banner.backgroundColor);
      root.style.setProperty('--banner-text', settings.banner.textColor);
    }
  }, [settings.theme, settings.banner]);

  return <>{children}</>;
};