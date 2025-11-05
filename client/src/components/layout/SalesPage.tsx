import React, { memo } from "react";
import { LINKS } from "@/config";
import { RecipeImages } from '@/assets/imageExports';
import {
  Header,
  TargetAudienceSection,
  ExclusiveRecipesNotice,
  WhatYouReceiveSection,
  BonusSection,
  MissionStatement,
  PriceSection,
  TestimonialImagesSection,
  ChefSignature,
  ImageSection
} from './sales';

const SalesPage = memo(() => {
  const buyUrl = LINKS.SALES.BUY_URL;
  
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[500px] mx-auto px-3 sm:px-4 py-6 sm:py-8 text-[#333] overflow-x-hidden w-full" style={{ minHeight: '100vh' }}>
        <Header />

        <div className="mb-8 border border-gray-200 rounded-md overflow-hidden">
          <img 
            src={RecipeImages.gridCollage} 
            alt="Collezione di ricette senza zucchero, senza glutine e senza lattosio"
            className="w-full h-auto"
            loading="lazy"
            decoding="async"
          />
        </div>

        <TargetAudienceSection />
        <ExclusiveRecipesNotice />
        <ImageSection 
          src={RecipeImages.chefSofiaBook} 
          alt="Pagine del libro di ricette senza zucchero"
          fallbackSrc={RecipeImages.main}
        />
        <WhatYouReceiveSection />
        <BonusSection />
        <MissionStatement />
        <ImageSection 
          src={RecipeImages.chefSofia} 
          alt="Livre de recettes Chef Amélie Dupont"
          fallbackSrc={RecipeImages.main}
        />
        <TestimonialImagesSection />
        <PriceSection buyUrl={buyUrl} />
        <ChefSignature />
      </div>
    </div>
  );
});

SalesPage.displayName = "SalesPage";

export default SalesPage;
