import React, { useState } from 'react';
import { useAdmin, AppConfig, MusicAppConfig, BannerConfig, ThemeConfig, ClockConfig } from '@/contexts/AdminContext';
import { LocalMusicManager } from './LocalMusicManager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Palette, 
  Clock, 
  Image, 
  Plus, 
  Trash2, 
  GripVertical,
  Eye,
  EyeOff,
  Power
} from 'lucide-react';

export const AdminPanel = () => {
  const { settings, updateSettings, isAdminMode, setAdminMode, logoutAdmin } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [musicFilter, setMusicFilter] = useState<'all' | 'streaming' | 'local' | 'radio'>('all');

  const updateApps = (newApps: AppConfig[]) => {
    updateSettings({ apps: newApps });
  };

  const updateMusicApps = (newMusicApps: MusicAppConfig[]) => {
    updateSettings({ musicApps: newMusicApps });
  };

  const updateBanner = (newBanner: Partial<BannerConfig>) => {
    updateSettings({ banner: { ...settings.banner, ...newBanner } });
  };

  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    updateSettings({ theme: { ...settings.theme, ...newTheme } });
  };

  const updateClock = (newClock: Partial<ClockConfig>) => {
    updateSettings({ clock: { ...settings.clock, ...newClock } });
  };

  const addApp = () => {
    const newApp: AppConfig = {
      id: `app-${Date.now()}`,
      name: 'Novo App',
      icon: 'Globe',
      enabled: true,
      order: settings.apps.length
    };
    updateApps([...settings.apps, newApp]);
  };

  const addMusicApp = () => {
    const newMusicApp: MusicAppConfig = {
      id: `music-app-${Date.now()}`,
      name: 'Novo App de Música',
      icon: 'Music',
      enabled: true,
      order: settings.musicApps.length,
      category: 'streaming'
    };
    updateMusicApps([...settings.musicApps, newMusicApp]);
  };

  const removeApp = (appId: string) => {
    updateApps(settings.apps.filter(app => app.id !== appId));
  };

  const removeMusicApp = (appId: string) => {
    updateMusicApps(settings.musicApps.filter(app => app.id !== appId));
  };

  const updateApp = (appId: string, updates: Partial<AppConfig>) => {
    updateApps(settings.apps.map(app => 
      app.id === appId ? { ...app, ...updates } : app
    ));
  };

  const updateMusicApp = (appId: string, updates: Partial<MusicAppConfig>) => {
    updateMusicApps(settings.musicApps.map(app => 
      app.id === appId ? { ...app, ...updates } : app
    ));
  };

  const reorderApps = (fromIndex: number, toIndex: number) => {
    const newApps = [...settings.apps];
    const [movedApp] = newApps.splice(fromIndex, 1);
    newApps.splice(toIndex, 0, movedApp);
    newApps.forEach((app, index) => {
      app.order = index;
    });
    updateApps(newApps);
  };

  const reorderMusicApps = (fromIndex: number, toIndex: number) => {
    const newMusicApps = [...settings.musicApps];
    const [movedApp] = newMusicApps.splice(fromIndex, 1);
    newMusicApps.splice(toIndex, 0, movedApp);
    newMusicApps.forEach((app, index) => {
      app.order = index;
    });
    updateMusicApps(newMusicApps);
  };

  // Mostrar mensagem de boas-vindas quando o painel for aberto
  React.useEffect(() => {
    if (isAdminMode) {
      setShowWelcomeMessage(true);
      const timer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdminMode]);

  // Fechar painel com tecla Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAdminMode) {
        logoutAdmin();
      }
    };

    if (isAdminMode) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAdminMode, logoutAdmin]);

  if (!isAdminMode) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      {/* Mensagem de boas-vindas */}
      {showWelcomeMessage && (
        <div className="fixed top-6 right-6 z-60 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Login realizado com sucesso!</span>
          </div>
        </div>
      )}
      
      <Card className="w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-elevated border-2 border-border/50">
        <CardHeader className="bg-gradient-to-r from-tv-sidebar to-card border-b border-border/50 sticky top-0 z-10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Settings className="w-5 h-5 text-primary-foreground" />
                </div>
                Painel de Administração
              </CardTitle>
              <CardDescription className="text-base">
                Personalize completamente seu launcher TV Box de forma profissional
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={logoutAdmin} 
              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
            >
              <Power className="w-4 h-4 mr-2" />
              Sair do Admin
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-[calc(92vh-140px)] p-6">
          <Tabs defaultValue="apps" className="w-full">
            <TabsList className="grid w-full grid-cols-6 h-12 bg-muted/50 p-1">
              <TabsTrigger value="apps" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Apps
              </TabsTrigger>
              <TabsTrigger value="music" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Música
              </TabsTrigger>
              <TabsTrigger value="local-music" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Suas Músicas
              </TabsTrigger>
              <TabsTrigger value="banner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Banner
              </TabsTrigger>
              <TabsTrigger value="theme" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Tema
              </TabsTrigger>
              <TabsTrigger value="clock" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Relógio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="apps" className="space-y-6 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Gerenciar Aplicativos</h3>
                  <p className="text-sm text-muted-foreground mt-1">Configure os apps que aparecem no launcher</p>
                </div>
                <Button onClick={addApp} size="default" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar App
                </Button>
              </div>
              
              <div className="space-y-4">
                {settings.apps
                  .sort((a, b) => a.order - b.order)
                  .map((app, index) => (
                  <Card key={app.id} className="p-5 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-move hover:text-primary transition-colors" />
                      
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`app-name-${app.id}`}>Nome</Label>
                          <Input
                            id={`app-name-${app.id}`}
                            value={app.name}
                            onChange={(e) => updateApp(app.id, { name: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`app-icon-${app.id}`}>Ícone</Label>
                          <Input
                            id={`app-icon-${app.id}`}
                            value={app.icon}
                            onChange={(e) => updateApp(app.id, { icon: e.target.value })}
                            placeholder="Nome do ícone Lucide"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`app-url-${app.id}`}>URL (opcional)</Label>
                          <Input
                            id={`app-url-${app.id}`}
                            value={app.url || ''}
                            onChange={(e) => updateApp(app.id, { url: e.target.value })}
                            placeholder="https://exemplo.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`app-package-${app.id}`}>Package Android (opcional)</Label>
                          <Input
                            id={`app-package-${app.id}`}
                            value={app.packageName || ''}
                            onChange={(e) => updateApp(app.id, { packageName: e.target.value })}
                            placeholder="com.exemplo.app"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`app-enabled-${app.id}`}
                            checked={app.enabled}
                            onCheckedChange={(checked) => updateApp(app.id, { enabled: checked })}
                          />
                          <Label htmlFor={`app-enabled-${app.id}`}>Ativo</Label>
                        </div>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeApp(app.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="music" className="space-y-6 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Music className="w-5 h-5 text-primary" />
                    Gerenciar Apps de Música
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure os apps de música que aparecem no launcher
                    <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {settings.musicApps.filter(app => app.enabled).length} ativos
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Select value={musicFilter} onValueChange={(value: any) => setMusicFilter(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      <SelectItem value="streaming">Streaming</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="radio">Rádio</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addMusicApp} size="default" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar App
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {settings.musicApps
                  .filter(app => musicFilter === 'all' || app.category === musicFilter)
                  .sort((a, b) => a.order - b.order)
                  .map((app, index) => (
                  <Card key={app.id} className="p-5 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-move hover:text-primary transition-colors" />
                      
                      <div className="flex flex-col items-center gap-1">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.category === 'streaming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          app.category === 'radio' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {app.category === 'streaming' ? 'Streaming' : 
                           app.category === 'radio' ? 'Rádio' : 'Local'}
                        </div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`music-app-name-${app.id}`}>Nome</Label>
                          <Input
                            id={`music-app-name-${app.id}`}
                            value={app.name}
                            onChange={(e) => updateMusicApp(app.id, { name: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`music-app-icon-${app.id}`}>Ícone</Label>
                          <Input
                            id={`music-app-icon-${app.id}`}
                            value={app.icon}
                            onChange={(e) => updateMusicApp(app.id, { icon: e.target.value })}
                            placeholder="Nome do ícone Lucide"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`music-app-url-${app.id}`}>URL (opcional)</Label>
                          <Input
                            id={`music-app-url-${app.id}`}
                            value={app.url || ''}
                            onChange={(e) => updateMusicApp(app.id, { url: e.target.value })}
                            placeholder="https://exemplo.com"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`music-app-package-${app.id}`}>Package Android</Label>
                          <Input
                            id={`music-app-package-${app.id}`}
                            value={app.packageName || ''}
                            onChange={(e) => updateMusicApp(app.id, { packageName: e.target.value })}
                            placeholder="com.exemplo.music"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`music-app-category-${app.id}`}>Categoria</Label>
                          <Select
                            value={app.category}
                            onValueChange={(value: any) => updateMusicApp(app.id, { category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="streaming">Streaming</SelectItem>
                              <SelectItem value="local">Local</SelectItem>
                              <SelectItem value="radio">Rádio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`music-app-enabled-${app.id}`}
                            checked={app.enabled}
                            onCheckedChange={(checked) => updateMusicApp(app.id, { enabled: checked })}
                          />
                          <Label htmlFor={`music-app-enabled-${app.id}`}>Ativo</Label>
                        </div>
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeMusicApp(app.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="local-music" className="space-y-6 pt-6">
              <LocalMusicManager />
            </TabsContent>

            <TabsContent value="banner" className="space-y-6 pt-6">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Configurações do Banner
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Personalize o banner principal do launcher</p>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="banner-title">Título</Label>
                  <Input
                    id="banner-title"
                    value={settings.banner.title}
                    onChange={(e) => updateBanner({ title: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="banner-subtitle">Subtítulo</Label>
                  <Input
                    id="banner-subtitle"
                    value={settings.banner.subtitle}
                    onChange={(e) => updateBanner({ subtitle: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="banner-logo">Logo</Label>
                  <Input
                    id="banner-logo"
                    value={settings.banner.logo}
                    onChange={(e) => updateBanner({ logo: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="banner-bg-color">Cor de Fundo</Label>
                  <Input
                    id="banner-bg-color"
                    type="color"
                    value={settings.banner.backgroundColor}
                    onChange={(e) => updateBanner({ backgroundColor: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="banner-text-color">Cor do Texto</Label>
                  <Input
                    id="banner-text-color"
                    type="color"
                    value={settings.banner.textColor}
                    onChange={(e) => updateBanner({ textColor: e.target.value })}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="banner-enabled"
                    checked={settings.banner.enabled}
                    onCheckedChange={(checked) => updateBanner({ enabled: checked })}
                  />
                  <Label htmlFor="banner-enabled">Banner Ativo</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="theme" className="space-y-6 pt-6">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Configurações de Tema
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Ajuste as cores do tema para combinar com sua marca</p>
              </div>
              
              <div className="grid grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="primary-color" className="text-sm font-semibold">Cor Primária</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="primary-color"
                      type="color"
                      value={settings.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="h-12 w-24 cursor-pointer"
                    />
                    <Input
                      value={settings.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondary-color" className="text-sm font-semibold">Cor Secundária</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={settings.theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="h-12 w-24 cursor-pointer"
                    />
                    <Input
                      value={settings.theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accent-color" className="text-sm font-semibold">Cor de Destaque</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="accent-color"
                      type="color"
                      value={settings.theme.accentColor}
                      onChange={(e) => updateTheme({ accentColor: e.target.value })}
                      className="h-12 w-24 cursor-pointer"
                    />
                    <Input
                      value={settings.theme.accentColor}
                      onChange={(e) => updateTheme({ accentColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bg-color" className="text-sm font-semibold">Cor de Fundo</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="bg-color"
                      type="color"
                      value={settings.theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="h-12 w-24 cursor-pointer"
                    />
                    <Input
                      value={settings.theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="text-color" className="text-sm font-semibold">Cor do Texto</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="text-color"
                      type="color"
                      value={settings.theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="h-12 w-24 cursor-pointer"
                    />
                    <Input
                      value={settings.theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-color" className="text-sm font-semibold">Cor dos Cards</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="card-color"
                      type="color"
                      value={settings.theme.cardColor}
                      onChange={(e) => updateTheme({ cardColor: e.target.value })}
                      className="h-12 w-24 cursor-pointer"
                    />
                    <Input
                      value={settings.theme.cardColor}
                      onChange={(e) => updateTheme({ cardColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clock" className="space-y-6 pt-6">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Configurações do Relógio
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Configure a exibição de data e hora no launcher</p>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="clock-enabled"
                    checked={settings.clock.enabled}
                    onCheckedChange={(checked) => updateClock({ enabled: checked })}
                  />
                  <Label htmlFor="clock-enabled">Relógio Ativo</Label>
                </div>
                
                <div>
                  <Label htmlFor="clock-position">Posição</Label>
                  <Select
                    value={settings.clock.position}
                    onValueChange={(value: any) => updateClock({ position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Superior Esquerda</SelectItem>
                      <SelectItem value="top-right">Superior Direita</SelectItem>
                      <SelectItem value="bottom-left">Inferior Esquerda</SelectItem>
                      <SelectItem value="bottom-right">Inferior Direita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="clock-format">Formato</Label>
                  <Select
                    value={settings.clock.format}
                    onValueChange={(value: any) => updateClock({ format: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                      <SelectItem value="24h">24 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="clock-date"
                    checked={settings.clock.showDate}
                    onCheckedChange={(checked) => updateClock({ showDate: checked })}
                  />
                  <Label htmlFor="clock-date">Mostrar Data</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="clock-seconds"
                    checked={settings.clock.showSeconds}
                    onCheckedChange={(checked) => updateClock({ showSeconds: checked })}
                  />
                  <Label htmlFor="clock-seconds">Mostrar Segundos</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};