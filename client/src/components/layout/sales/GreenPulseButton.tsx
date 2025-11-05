import React, { memo } from "react";
import { COLORS } from "@/config";

interface GreenPulseButtonProps {
  href: string;
  children: React.ReactNode;
}

export const GreenPulseButton = memo(({ href, children }: GreenPulseButtonProps) => {
  const handleClick = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🛒 CLICK DETECTADO - Botão da Hotmart');
      console.log('🔗 URL:', href);
    }
  };
  
  return (
    <div className="relative inline-block w-full md:w-auto mb-4">
      <div 
        className="absolute inset-0 rounded-full opacity-30" 
        style={{
          backgroundColor: COLORS.SUCCESS,
          animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
        }}
      />
      <a 
        href={href}
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative inline-block w-full py-3 sm:py-4 px-6 sm:px-10 text-base sm:text-lg font-bold rounded-full text-white cursor-pointer transition-colors duration-300 ease-in-out text-center no-underline hover:opacity-90"
        style={{ 
          backgroundColor: COLORS.SUCCESS,
          boxShadow: `0 4px 10px rgba(87, 192, 132, 0.3)`
        }}
      >
        {children}
      </a>
    </div>
  );
});

GreenPulseButton.displayName = "GreenPulseButton";
