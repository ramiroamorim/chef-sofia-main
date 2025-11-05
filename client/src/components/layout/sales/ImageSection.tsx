import React, { memo } from "react";

interface ImageSectionProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

export const ImageSection = memo(({ src, alt, fallbackSrc, className = "" }: ImageSectionProps) => (
  <div className={`mb-4 sm:mb-5 overflow-hidden ${className}`}>
    <img 
      src={src} 
      alt={alt}
      className="w-full h-auto rounded-xl shadow-lg"
      loading="lazy"
      decoding="async"
      style={{ 
        border: "1px solid #f0f0f0",
        maxWidth: "100%",
        width: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto"
      }}
      onError={(e) => {
        console.error("Erro ao carregar imagem:", e);
        const target = e.target as HTMLImageElement;
        target.onerror = null;
        if (fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
    />
  </div>
));

ImageSection.displayName = "ImageSection";
