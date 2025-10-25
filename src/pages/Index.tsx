import { useState, useEffect, useCallback } from "react";
import { TVHeader } from "@/components/TVHeader";
import { AppIcon } from "@/components/AppIcon";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { toast } from "@/components/ui/use-toast";
import {
  Youtube,
  Tv,
  Play,
  Music,
  Settings,
  Chrome,
  Globe,
  Smartphone,
} from "lucide-react";

interface App {
  id: string;
  icon: any;
  label: string;
  url?: string;
  packageName?: string;
}

const apps: App[] = [
  { 
    id: "youtube", 
    icon: Youtube, 
    label: "YouTube",
    url: "https://www.youtube.com",
    packageName: "com.google.android.youtube.tv"
  },
  { 
    id: "netflix", 
    icon: Tv, 
    label: "Netflix",
    url: "https://www.netflix.com",
    packageName: "com.netflix.ninja"
  },
  { 
    id: "spotify", 
    icon: Music, 
    label: "Spotify",
    url: "https://open.spotify.com",
    packageName: "com.spotify.tv.android"
  },
];

const Index = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [section, setSection] = useState<'banner' | 'apps'>('banner');
  const columns = 3;

  const openApp = (app: App) => {
    if (app.packageName) {
      // Open native Android app
      window.location.href = `intent://#Intent;package=${app.packageName};end`;
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
      const totalApps = apps.length;
      const currentRow = Math.floor(focusedIndex / columns);
      const currentCol = focusedIndex % columns;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          if (section === 'apps') {
            setFocusedIndex((prev) => (prev + 1) % totalApps);
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (section === 'apps') {
            setFocusedIndex((prev) => (prev - 1 + totalApps) % totalApps);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (section === 'banner') {
            setSection('apps');
            setFocusedIndex(0);
          } else {
            const nextRowIndex = (currentRow + 1) * columns + currentCol;
            setFocusedIndex(nextRowIndex < totalApps ? nextRowIndex : focusedIndex);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (section === 'apps' && currentRow === 0) {
            setSection('banner');
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
            openApp(apps[focusedIndex]);
          }
          break;
      }
    },
    [focusedIndex, columns, section]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <TVHeader />
      
      <main className="flex-1 px-12 py-8 space-y-8 overflow-y-auto">
        <section>
          <FeaturedBanner
            title="CHEGOU A HORA"
            subtitle="DE VOCÊ TER TUDO"
            logo="RedPlay"
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

        <section>
          <h2 className="text-3xl font-semibold text-foreground mb-6 px-2">
            Aplicativos
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <AppIcon
                key={app.id}
                icon={app.icon}
                label={app.label}
                focused={section === 'apps' && focusedIndex === index}
                onClick={() => {
                  setSection('apps');
                  setFocusedIndex(index);
                  openApp(app);
                }}
              />
            ))}
          </div>
        </section>

        <div className="fixed bottom-4 right-6 text-xs text-muted-foreground bg-card/80 px-3 py-1.5 rounded border border-border">
          Use as setas ← → ↑ ↓ para navegar | Enter para abrir
        </div>
      </main>
    </div>
  );
};

export default Index;
