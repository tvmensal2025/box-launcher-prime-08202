import React, { useState, useRef } from 'react';
import { useAdmin, LocalMusic } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Music, 
  Upload, 
  Play, 
  Pause, 
  Trash2, 
  GripVertical,
  Volume2,
  Clock
} from 'lucide-react';

export const LocalMusicManager = () => {
  const { settings, updateSettings } = useAdmin();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateLocalMusic = (newMusic: LocalMusic[]) => {
    updateSettings({ localMusic: newMusic });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const newMusic: LocalMusic = {
          id: `music-${Date.now()}-${Math.random()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          artist: 'Artista Desconhecido',
          album: 'Álbum Desconhecido',
          duration: 0, // Será calculado quando o áudio carregar
          file: file,
          url: url,
          enabled: true,
          order: settings.localMusic.length
        };

        // Criar elemento de áudio para obter duração
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          newMusic.duration = audio.duration;
          updateLocalMusic([...settings.localMusic, newMusic]);
        });
      }
    });

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeMusic = (musicId: string) => {
    const music = settings.localMusic.find(m => m.id === musicId);
    if (music) {
      URL.revokeObjectURL(music.url);
    }
    updateLocalMusic(settings.localMusic.filter(m => m.id !== musicId));
  };

  const updateMusic = (musicId: string, updates: Partial<LocalMusic>) => {
    updateLocalMusic(settings.localMusic.map(music => 
      music.id === musicId ? { ...music, ...updates } : music
    ));
  };

  const togglePlay = (music: LocalMusic) => {
    if (isPlaying === music.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = music.url;
        audioRef.current.play();
      }
      setIsPlaying(music.id);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            Suas Músicas
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Adicione e gerencie suas músicas locais
            <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
              {settings.localMusic.filter(music => music.enabled).length} músicas
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Upload className="w-4 h-4 mr-2" />
            Adicionar Músicas
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {settings.localMusic
          .sort((a, b) => a.order - b.order)
          .map((music, index) => (
          <Card key={music.id} className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground cursor-move hover:text-primary transition-colors" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => togglePlay(music)}
                className="p-2 hover:bg-primary/10"
              >
                {isPlaying === music.id ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>

              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`music-title-${music.id}`}>Título</Label>
                  <Input
                    id={`music-title-${music.id}`}
                    value={music.title}
                    onChange={(e) => updateMusic(music.id, { title: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`music-artist-${music.id}`}>Artista</Label>
                  <Input
                    id={`music-artist-${music.id}`}
                    value={music.artist}
                    onChange={(e) => updateMusic(music.id, { artist: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`music-album-${music.id}`}>Álbum</Label>
                  <Input
                    id={`music-album-${music.id}`}
                    value={music.album || ''}
                    onChange={(e) => updateMusic(music.id, { album: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(music.duration)}
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`music-enabled-${music.id}`}
                    checked={music.enabled}
                    onChange={(e) => updateMusic(music.id, { enabled: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor={`music-enabled-${music.id}`} className="text-sm">Ativo</Label>
                </div>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMusic(music.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {settings.localMusic.length === 0 && (
          <Card className="p-8 text-center border-dashed border-2 border-border/50">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma música adicionada</h3>
            <p className="text-muted-foreground mb-4">
              Clique em "Adicionar Músicas" para fazer upload dos seus arquivos de áudio
            </p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Upload className="w-4 h-4 mr-2" />
              Adicionar Primeira Música
            </Button>
          </Card>
        )}
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(null)}
      />
    </div>
  );
};