import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  focused?: boolean;
  className?: string;
  size?: 'small' | 'large';
}

export const AppIcon = ({ icon: Icon, label, onClick, focused, className, size = 'large' }: AppIconProps) => {
  const isSmall = size === 'small';
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "app-icon group flex flex-col items-center justify-center rounded-2xl",
        "bg-gradient-to-br from-card to-card/50 border border-border/30",
        "hover:border-primary/40 hover:shadow-card focus:border-primary/40",
        "outline-none transition-all duration-300",
        focused && "tv-focus border-primary/60 scale-110 shadow-elevated",
        isSmall ? "p-4" : "p-8",
        className
      )}
      aria-label={label}
    >
      <div className={cn(
        "rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-glow",
        "group-hover:scale-105 transition-transform duration-300",
        isSmall ? "w-16 h-16 mb-3" : "w-28 h-28 mb-4"
      )}>
        <Icon className={cn(
          "text-primary-foreground drop-shadow-lg",
          isSmall ? "w-8 h-8" : "w-16 h-16"
        )} />
      </div>
      <span className={cn(
        "font-semibold text-foreground text-center group-hover:text-primary transition-colors",
        isSmall ? "text-sm" : "text-xl"
      )}>
        {label}
      </span>
    </button>
  );
};
