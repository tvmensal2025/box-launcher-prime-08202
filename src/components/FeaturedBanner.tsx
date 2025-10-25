import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/contexts/AdminContext";

interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  logo: string;
  onClick?: () => void;
  focused?: boolean;
}

export const FeaturedBanner = ({ title, subtitle, logo, onClick, focused }: FeaturedBannerProps) => {
  const { settings } = useAdmin();
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full h-[500px] rounded-2xl overflow-hidden",
        "outline-none transition-all duration-300",
        "cursor-pointer shadow-2xl",
        focused && "tv-focus scale-[1.01]"
      )}
      style={{
        backgroundColor: settings.banner.backgroundColor,
        backgroundImage: settings.banner.backgroundImage ? `url(${settings.banner.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative h-full flex flex-col justify-center items-center text-center p-12">
        <div className="space-y-6">
          <h2 
            className="text-7xl font-bold leading-tight"
            style={{ color: settings.banner.textColor }}
          >
            {title}
          </h2>
          <p 
            className="text-4xl font-semibold"
            style={{ color: settings.banner.textColor + '90' }}
          >
            {subtitle}
          </p>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div 
              className="px-8 py-4 backdrop-blur-sm rounded-xl border-2"
              style={{ 
                backgroundColor: settings.banner.textColor + '20',
                borderColor: settings.banner.textColor + '30'
              }}
            >
              <span 
                className="text-5xl font-bold"
                style={{ color: settings.banner.textColor }}
              >
                {logo}
              </span>
            </div>
            <span 
              className="text-lg"
              style={{ color: settings.banner.textColor + '90' }}
            >
              Pressione Enter para acessar
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
