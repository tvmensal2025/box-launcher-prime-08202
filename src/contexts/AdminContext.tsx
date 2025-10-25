import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  url?: string;
  packageName?: string;
  enabled: boolean;
  order: number;
}

export interface MusicAppConfig {
  id: string;
  name: string;
  icon: string;
  url?: string;
  packageName?: string;
  enabled: boolean;
  order: number;
  category: 'streaming' | 'local' | 'radio';
}

export interface BannerConfig {
  title: string;
  subtitle: string;
  logo: string;
  backgroundImage?: string;
  backgroundColor: string;
  textColor: string;
  enabled: boolean;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
}

export interface ClockConfig {
  enabled: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  format: '12h' | '24h';
  showDate: boolean;
  showSeconds: boolean;
}

export interface AdminSettings {
  apps: AppConfig[];
  musicApps: MusicAppConfig[];
  banner: BannerConfig;
  theme: ThemeConfig;
  clock: ClockConfig;
  adminPassword: string;
}

const defaultSettings: AdminSettings = {
  apps: [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'Youtube',
      url: 'https://www.youtube.com',
      packageName: 'com.google.android.youtube.tv',
      enabled: true,
      order: 0
    },
    {
      id: 'google',
      name: 'Google',
      icon: 'Globe',
      url: 'https://www.google.com',
      enabled: true,
      order: 1
    },
    {
      id: 'tvemove',
      name: 'TveMove',
      icon: 'Tv',
      url: 'https://dl.ntdev.in/58331',
      enabled: true,
      order: 2
    }
  ],
  musicApps: [
    {
      id: 'spotify',
      name: 'Spotify',
      icon: 'Music',
      packageName: 'com.spotify.music',
      enabled: true,
      order: 0,
      category: 'streaming'
    },
    {
      id: 'youtube-music',
      name: 'YouTube Music',
      icon: 'Youtube',
      packageName: 'com.google.android.apps.youtube.music',
      enabled: true,
      order: 1,
      category: 'streaming'
    },
    {
      id: 'deezer',
      name: 'Deezer',
      icon: 'Music',
      packageName: 'deezer.android.app',
      enabled: true,
      order: 2,
      category: 'streaming'
    },
    {
      id: 'apple-music',
      name: 'Apple Music',
      icon: 'Music',
      packageName: 'com.apple.android.music',
      enabled: true,
      order: 3,
      category: 'streaming'
    },
    {
      id: 'tidal',
      name: 'Tidal',
      icon: 'Music',
      packageName: 'com.aspiro.tidal',
      enabled: true,
      order: 4,
      category: 'streaming'
    },
    {
      id: 'soundcloud',
      name: 'SoundCloud',
      icon: 'Music',
      packageName: 'com.soundcloud.android',
      enabled: true,
      order: 5,
      category: 'streaming'
    }
  ],
  banner: {
    title: 'CHEGOU A HORA',
    subtitle: 'DE VOCÊ TER TUDO',
    logo: 'RedPlay',
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    enabled: true
  },
  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
    backgroundColor: '#0f172a',
    textColor: '#f8fafc',
    cardColor: '#1e293b'
  },
  clock: {
    enabled: true,
    position: 'top-right',
    format: '24h',
    showDate: true,
    showSeconds: false
  },
  adminPassword: 'admin123'
};

interface AdminContextType {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('tvbox-admin-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }, []);

  // Salvar configurações no localStorage
  useEffect(() => {
    localStorage.setItem('tvbox-admin-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const loginAdmin = (password: string): boolean => {
    if (password === settings.adminPassword) {
      setIsAdminMode(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminMode(false);
  };

  return (
    <AdminContext.Provider value={{
      settings,
      updateSettings,
      isAdminMode,
      setAdminMode: setIsAdminMode,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider');
  }
  return context;
};