import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";

export const TVHeader = () => {
  const { settings } = useAdmin();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: settings.clock.format === '12h'
    };
    
    if (settings.clock.showSeconds) {
      options.second = '2-digit';
    }
    
    return date.toLocaleTimeString('pt-BR', options);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!settings.clock.enabled) {
    return (
      <header className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-tv-header to-tv-sidebar border-b border-border/50 shadow-card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
            <span className="text-2xl font-bold text-primary-foreground">TV</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              TV Box Launcher
            </h1>
          </div>
        </div>
      </header>
    );
  }

  const clockPosition = settings.clock.position;
  const showDate = settings.clock.showDate;

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-tv-header to-tv-sidebar border-b border-border/50 shadow-card">
      {clockPosition.includes('left') && (
        <div className="text-left">
          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
            {formatTime(time)}
          </div>
          {showDate && (
            <p className="text-sm text-muted-foreground capitalize mt-1">{formatDate(time)}</p>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
          <span className="text-2xl font-bold text-primary-foreground">TV</span>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            TV Box Launcher
          </h1>
          {!clockPosition.includes('left') && showDate && (
            <p className="text-sm text-muted-foreground capitalize">{formatDate(time)}</p>
          )}
        </div>
      </div>
      
      {clockPosition.includes('right') && (
        <div className="text-right">
          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent tabular-nums">
            {formatTime(time)}
          </div>
          {showDate && (
            <p className="text-sm text-muted-foreground capitalize mt-1">{formatDate(time)}</p>
          )}
        </div>
      )}
    </header>
  );
};
