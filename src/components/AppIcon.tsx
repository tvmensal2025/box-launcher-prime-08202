import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppIconProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  focused?: boolean;
  className?: string;
}

export const AppIcon = ({ icon: Icon, label, onClick, focused, className }: AppIconProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "app-icon group flex flex-col items-center justify-center p-8 rounded-2xl",
        "bg-card hover:bg-secondary focus:bg-secondary",
        "outline-none transition-all duration-200",
        focused && "tv-focus bg-secondary scale-110",
        className
      )}
      aria-label={label}
    >
      <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-xl">
        <Icon className="w-16 h-16 text-primary-foreground" />
      </div>
      <span className="text-xl font-semibold text-foreground text-center">
        {label}
      </span>
    </button>
  );
};
