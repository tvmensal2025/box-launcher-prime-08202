import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  logo: string;
  onClick?: () => void;
  focused?: boolean;
}

export const FeaturedBanner = ({ title, subtitle, logo, onClick, focused }: FeaturedBannerProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full h-[500px] rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-primary via-purple-600 to-accent",
        "outline-none transition-all duration-300",
        "cursor-pointer shadow-2xl",
        focused && "tv-focus scale-[1.01]"
      )}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative h-full flex flex-col justify-center items-center text-center p-12">
        <div className="space-y-6">
          <h2 className="text-7xl font-bold text-white leading-tight">
            {title}
          </h2>
          <p className="text-4xl font-semibold text-white/90">
            {subtitle}
          </p>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/30">
              <span className="text-5xl font-bold text-white">{logo}</span>
            </div>
            <span className="text-lg text-white/90">Pressione Enter para acessar</span>
          </div>
        </div>
      </div>
    </button>
  );
};
