import { useState, useEffect, useCallback } from "react";
import { TVHeader } from "@/components/TVHeader";
import { AppIcon } from "@/components/AppIcon";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { toast } from "@/components/ui/use-toast";
import { useAdmin } from "@/contexts/AdminContext";
import * as LucideIcons from "lucide-react";
import {
  Youtube,
  Tv,
  Play,
  Music,
  Settings,
  Chrome,
  Globe,
  Smartphone,
  Wifi,
  WifiOff,
  Volume2,
  Sun,
  Shield,
  Monitor,
  Power,
  Menu,
} from "lucide-react";

interface App {
  id: string;
  icon: any;
  label: string;
  url?: string;
  packageName?: string;
}

const systemApps: App[] = [
  { 
    id: "settings", 
    icon: Settings, 
    label: "Configurações",
    packageName: "com.android.settings"
  },
  { 
    id: "wifi", 
    icon: Wifi, 
    label: "WiFi",
    packageName: "com.android.settings"
  },
  { 
    id: "volume", 
    icon: Volume2, 
    label: "Volume",
    packageName: "com.android.settings"
  },
  { 
    id: "brightness", 
    icon: Sun, 
    label: "Brilho",
    packageName: "com.android.settings"
  },
  { 
    id: "security", 
    icon: Shield, 
    label: "Segurança",
    packageName: "com.android.settings"
  },
  { 
    id: "display", 
    icon: Monitor, 
    label: "Tela",
    packageName: "com.android.settings"
  },
];

const Index = () => {
  const { settings } = useAdmin();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [section, setSection] = useState<'banner' | 'system' | 'media' | 'music'>('banner');
  const [currentAppList, setCurrentAppList] = useState<App[]>(systemApps);
  const columns = 6; // 6 colunas para apps do sistema

  // Converter apps do admin para o formato do componente
  const mediaApps = settings.apps
    .filter(app => app.enabled)
    .sort((a, b) => a.order - b.order)
    .map(app => ({
      id: app.id,
      icon: (LucideIcons as any)[app.icon] || Globe,
      label: app.name,
      url: app.url,
      packageName: app.packageName
    }));

  // Converter apps de música para o formato do componente
  const musicApps = settings.musicApps
    .filter(app => app.enabled)
    .sort((a, b) => a.order - b.order)
    .map(app => ({
      id: app.id,
      icon: (LucideIcons as any)[app.icon] || Music,
      label: app.name,
      url: app.url,
      packageName: app.packageName
    }));

  const openApp = (app: App) => {
    if (app.packageName) {
      if (app.id === 'wifi') {
        // Abrir configurações de WiFi especificamente
        window.location.href = `intent://#Intent;action=android.settings.WIFI_SETTINGS;end`;
      } else if (app.id === 'volume') {
        // Abrir configurações de som
        window.location.href = `intent://#Intent;action=android.settings.SOUND_SETTINGS;end`;
      } else if (app.id === 'brightness') {
        // Abrir configurações de brilho
        window.location.href = `intent://#Intent;action=android.settings.DISPLAY_SETTINGS;end`;
      } else if (app.id === 'security') {
        // Abrir configurações de segurança
        window.location.href = `intent://#Intent;action=android.settings.SECURITY_SETTINGS;end`;
      } else if (app.id === 'display') {
        // Abrir configurações de tela
        window.location.href = `intent://#Intent;action=android.settings.DISPLAY_SETTINGS;end`;
      } else {
        // Abrir configurações gerais
        window.location.href = `intent://#Intent;package=${app.packageName};end`;
      }
    } else if (app.url) {
      window.open(app.url, '_blank');
    }
    
    toast({
      title: `Abrindo ${app.label}`,
      description: "Aguarde um momento...",
    });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const totalApps = currentAppList.length;
      const currentRow = Math.floor(focusedIndex / columns);
      const currentCol = focusedIndex % columns;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          if (section === 'system' || section === 'media' || section === 'music') {
            setFocusedIndex((prev) => (prev + 1) % totalApps);
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (section === 'system' || section === 'media' || section === 'music') {
            setFocusedIndex((prev) => (prev - 1 + totalApps) % totalApps);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (section === 'banner') {
            setSection('system');
            setCurrentAppList(systemApps);
            setFocusedIndex(0);
          } else if (section === 'system') {
            setSection('media');
            setCurrentAppList(mediaApps);
            setFocusedIndex(0);
          } else if (section === 'media') {
            setSection('music');
            setCurrentAppList(musicApps);
            setFocusedIndex(0);
          } else {
            const nextRowIndex = (currentRow + 1) * columns + currentCol;
            setFocusedIndex(nextRowIndex < totalApps ? nextRowIndex : focusedIndex);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (section === 'system' && currentRow === 0) {
            setSection('banner');
          } else if (section === 'media' && currentRow === 0) {
            setSection('system');
            setCurrentAppList(systemApps);
            setFocusedIndex(0);
          } else if (section === 'music' && currentRow === 0) {
            setSection('media');
            setCurrentAppList(mediaApps);
            setFocusedIndex(0);
          } else if (currentRow > 0) {
            setFocusedIndex((currentRow - 1) * columns + currentCol);
          }
          break;
        case "Enter":
          e.preventDefault();
          if (section === 'banner') {
            window.open('https://redplay.com.br', '_blank');
            toast({
              title: "Abrindo RedPlay",
              description: "Seu serviço de streaming premium",
            });
          } else {
            openApp(currentAppList[focusedIndex]);
          }
          break;
      }
    },
    [focusedIndex, columns, section, currentAppList]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-tv-sidebar flex flex-col overflow-hidden">
      <TVHeader />
      
      <main className="flex-1 px-12 py-8 space-y-10 overflow-y-auto">
        {settings.banner.enabled && (
          <section>
            <FeaturedBanner
              title={settings.banner.title}
              subtitle={settings.banner.subtitle}
              logo={settings.banner.logo}
              focused={section === 'banner'}
              onClick={() => {
                window.open('https://redplay.com.br', '_blank');
                toast({
                  title: "Abrindo RedPlay",
                  description: "Seu serviço de streaming premium",
                });
              }}
            />
          </section>
        )}

        <section>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-8 px-2">
            Sistema
          </h2>
          <div className="grid grid-cols-6 gap-4 mb-8">
            {systemApps.map((app, index) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label={app.label}
                size="small"
                focused={section === 'system' && focusedIndex === index}
                onClick={() => {
                  setSection('system');
                  setCurrentAppList(systemApps);
                  setFocusedIndex(index);
                  openApp(app);
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-8 px-2">
            Entretenimento
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {mediaApps.map((app, index) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label={app.label}
                focused={section === 'media' && focusedIndex === index}
                onClick={() => {
                  setSection('media');
                  setCurrentAppList(mediaApps);
                  setFocusedIndex(index);
                  openApp(app);
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-8 px-2">
            Música
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {musicApps.map((app, index) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label={app.label}
                focused={section === 'music' && focusedIndex === index}
                onClick={() => {
                  setSection('music');
                  setCurrentAppList(musicApps);
                  setFocusedIndex(index);
                  openApp(app);
                }}
              />
            ))}
          </div>
        </section>

        <div className="fixed bottom-4 right-6 text-xs text-muted-foreground bg-card/80 px-3 py-1.5 rounded border border-border">
          Use as setas ← → ↑ ↓ para navegar | Enter para abrir | ↑↓ para alternar seções (Banner → Sistema → Entretenimento → Música)
        </div>
      </main>
    </div>
  );
};

export default Index;
