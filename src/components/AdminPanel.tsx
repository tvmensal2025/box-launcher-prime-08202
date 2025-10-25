import React, { useState } from 'react';
import { useAdmin, AppConfig, BannerConfig, ThemeConfig, ClockConfig } from '@/contexts/AdminContext';
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
  EyeOff
} from 'lucide-react';

export const AdminPanel = () => {
  const { settings, updateSettings, isAdminMode, setAdminMode, logoutAdmin } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);

  const updateApps = (newApps: AppConfig[]) => {
    updateSettings({ apps: newApps });
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

  const removeApp = (appId: string) => {
    updateApps(settings.apps.filter(app => app.id !== appId));
  };

  const updateApp = (appId: string, updates: Partial<AppConfig>) => {
    updateApps(settings.apps.map(app => 
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

  if (!isAdminMode) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Painel de Administração
            </CardTitle>
            <CardDescription>
              Personalize completamente seu launcher TV Box
            </CardDescription>
          </div>
          <Button variant="outline" onClick={logoutAdmin}>
            Sair
          </Button>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="apps" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="apps">Apps</TabsTrigger>
              <TabsTrigger value="banner">Banner</TabsTrigger>
              <TabsTrigger value="theme">Tema</TabsTrigger>
              <TabsTrigger value="clock">Relógio</TabsTrigger>
            </TabsList>

            <TabsContent value="apps" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gerenciar Aplicativos</h3>
                <Button onClick={addApp} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar App
                </Button>
              </div>
              
              <div className="space-y-3">
                {settings.apps
                  .sort((a, b) => a.order - b.order)
                  .map((app, index) => (
                  <Card key={app.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      
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

            <TabsContent value="banner" className="space-y-4">
              <h3 className="text-lg font-semibold">Configurações do Banner</h3>
              
              <div className="grid grid-cols-2 gap-4">
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

            <TabsContent value="theme" className="space-y-4">
              <h3 className="text-lg font-semibold">Configurações de Tema</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <Input
                    id="primary-color"
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <Input
                    id="secondary-color"
                    type="color"
                    value={settings.theme.secondaryColor}
                    onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="accent-color">Cor de Destaque</Label>
                  <Input
                    id="accent-color"
                    type="color"
                    value={settings.theme.accentColor}
                    onChange={(e) => updateTheme({ accentColor: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bg-color">Cor de Fundo</Label>
                  <Input
                    id="bg-color"
                    type="color"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="text-color">Cor do Texto</Label>
                  <Input
                    id="text-color"
                    type="color"
                    value={settings.theme.textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="card-color">Cor dos Cards</Label>
                  <Input
                    id="card-color"
                    type="color"
                    value={settings.theme.cardColor}
                    onChange={(e) => updateTheme({ cardColor: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="clock" className="space-y-4">
              <h3 className="text-lg font-semibold">Configurações do Relógio</h3>
              
              <div className="space-y-4">
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