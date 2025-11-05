import React, { memo } from "react";
import { TestimonialImages } from '@/assets/imageExports';

export const TestimonialImagesSection = memo(() => (
  <div className="mb-5 sm:mb-6 space-y-3 sm:space-y-4">
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <img 
        src={TestimonialImages.bread} 
        alt="Témoignage client - pain sans gluten"
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </div>
    
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <img 
        src={TestimonialImages.testimonial6} 
        alt="Témoignage client - brownie sans sucre"
        className="w-full h-auto"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
));

TestimonialImagesSection.displayName = "TestimonialImagesSection";
