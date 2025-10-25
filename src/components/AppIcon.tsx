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
        "bg-card hover:bg-secondary focus:bg-secondary",
        "outline-none transition-all duration-200",
        focused && "tv-focus bg-secondary scale-110",
        isSmall ? "p-4" : "p-8",
        className
      )}
      aria-label={label}
    >
      <div className={cn(
        "rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl",
        isSmall ? "w-16 h-16 mb-2" : "w-28 h-28 mb-4"
      )}>
        <Icon className={cn(
          "text-primary-foreground",
          isSmall ? "w-8 h-8" : "w-16 h-16"
        )} />
      </div>
      <span className={cn(
        "font-semibold text-foreground text-center",
        isSmall ? "text-sm" : "text-xl"
      )}>
        {label}
      </span>
    </button>
  );
};
