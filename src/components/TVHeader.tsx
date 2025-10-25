import { useState, useEffect } from "react";

export const TVHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <header className="flex items-center justify-between px-8 py-6 bg-tv-sidebar border-b border-border">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">TV</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">TV Box Launcher</h1>
          <p className="text-sm text-muted-foreground capitalize">{formatDate(time)}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
          {formatTime(time)}
        </div>
      </div>
    </header>
  );
};
