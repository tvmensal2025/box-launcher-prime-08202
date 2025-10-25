import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = () => {
  const { loginAdmin, isAdminMode } = useAdmin();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    
    // Simular um pequeno delay para melhor UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (loginAdmin(password)) {
      setPassword('');
      // O painel admin será aberto automaticamente devido ao isAdminMode
    } else {
      setError('Senha incorreta');
    }
    
    setIsLoggingIn(false);
  };

  // Não mostrar o formulário de login se já estiver logado
  if (isAdminMode) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Card className="w-80 shadow-elevated border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Settings className="w-4 h-4 text-primary-foreground" />
            </div>
            Acesso Admin
          </CardTitle>
          <CardDescription className="text-sm">
            Digite a senha para personalizar o launcher
            <br />
            <span className="text-xs text-muted-foreground">
              Pressione ESC para fechar o painel
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <Label htmlFor="admin-password" className="text-xs">Senha</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="pr-8"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              size="sm" 
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};