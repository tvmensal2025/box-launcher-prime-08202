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
      <header className="flex items-center justify-between px-8 py-6 bg-tv-sidebar border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">TV</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">TV Box Launcher</h1>
          </div>
        </div>
      </header>
    );
  }

  const clockPosition = settings.clock.position;
  const showDate = settings.clock.showDate;

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-tv-sidebar border-b border-border">
      {clockPosition.includes('left') && (
        <div className="text-right">
          <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
            {formatTime(time)}
          </div>
          {showDate && (
            <p className="text-sm text-muted-foreground capitalize">{formatDate(time)}</p>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">TV</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">TV Box Launcher</h1>
          {!clockPosition.includes('left') && showDate && (
            <p className="text-sm text-muted-foreground capitalize">{formatDate(time)}</p>
          )}
        </div>
      </div>
      
      {clockPosition.includes('right') && (
        <div className="text-right">
          <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
            {formatTime(time)}
          </div>
          {showDate && (
            <p className="text-sm text-muted-foreground capitalize">{formatDate(time)}</p>
          )}
        </div>
      )}
    </header>
  );
};
