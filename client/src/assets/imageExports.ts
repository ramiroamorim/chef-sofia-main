/**
 * Arquivo centralizador de imagens
 * 
 * Este arquivo exporta todas as imagens utilizadas no projeto de forma organizada.
 * Sempre importe imagens deste arquivo em vez de importar diretamente dos arquivos.
 */

// Chef Images (otimizadas para melhor performance)
import chefProfile from './images/chef/chef-profile-optimized.webp';
import chefAmelie from './images/chef/chef-amelie-optimized.webp';
import chefSofia from './images/chef/chef-sofia-optimized.webp';

// Quiz Images (otimizadas para melhor performance)
import etapa01 from './images/quiz/etapa-01-optimized.webp';
import etapa02 from './images/quiz/etapa-02-optimized.webp';
import etapa07 from './images/quiz/etapa-07-optimized.webp';

// Recipes Images (otimizadas para melhor performance)
import recipeBook from './images/recipes/recipe-book-optimized.webp';
import recipeCollage from './images/recipes/recipe-book-collage-optimized.webp';
import recipeBookNew from './images/recipes/recipe-book-new-optimized.webp';
import recipesGrid from './images/recipes/recipes-grid-optimized.webp';
import recipesGridCollage from './images/recipes/recipes-grid-collage-optimized.webp';
import recipesMain from './images/recipes/recipes-main-optimized.webp';
import recipes from './images/recipes/recipes-optimized.webp';
import perfilChefSofiaBook from './images/recipes/perfil-chef-sofia-book-optimized.webp';
import perfilChefSofia from './images/recipes/perfil-chef-sofia-optimized.webp';
import bookPages from './images/book/book-pages.png';

// Testimonials Images (otimizadas para melhor performance)
import testimonial1 from './images/testimonials/1193d754-5e03-42cf-853f-fc59bc7e7db4-optimized.webp';
import testimonial2 from './images/testimonials/370efb68-9d8e-432b-b0c5-ef26c792e228-optimized.webp';
import testimonial3 from './images/testimonials/3abb9dd0-e903-498e-913d-f645ae8b6b3f-optimized.webp';
import testimonial4 from './images/testimonials/5ed6dd62-8472-4170-8264-fac63010f762-optimized.webp';
import testimonialBread from './images/testimonials/6975f17a-7bbb-4e4e-acce-d969cd21f7f5-optimized.webp';
import testimonialBrownie from './images/testimonials/b0c8599b-036e-4648-9387-b81e1545dd9a-optimized.webp';
import testimonial5 from './images/testimonials/b4570fb2-95e0-4474-bc46-2076f0827c19-optimized.webp';
import testimonial6 from './images/testimonials/d233cffd-a5c4-45b1-b3a0-24f08356bf37-optimized.webp';
import testimonial7 from './images/testimonials/dccaaad7-af99-4612-9ff4-f5cd49a8bc5b-optimized.webp';
import imagePageOffer from './images/testimonials/image-02-page-offer-optimized.webp';

// Thank You Page Images
import thankYouPage from './images/thank-you/thank-you-page.png';
import audioPreview from './images/thank-you/audio-preview.png';

// Export por categoria para organização
export const ChefImages = {
  profile: chefProfile,
  amelie: chefAmelie,
  sofia: chefSofia
};

export const QuizImages = {
  etapa01,
  etapa02,
  etapa07
};

export const RecipeImages = {
  book: recipeBook,
  collage: recipeCollage,
  grid: recipesGrid,
  gridCollage: recipesGridCollage,
  main: recipesMain,
  recipes: recipes,
  bookPages: bookPages,
  chefSofiaBook: perfilChefSofiaBook,
  chefSofia: perfilChefSofia
};

export const TestimonialImages = {
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
  testimonial6,
  testimonial7,
  bread: testimonialBread,
  brownie: testimonialBrownie,
  pageOffer: imagePageOffer
};

export const ThankYouImages = {
  page: thankYouPage,
  audioPreview: audioPreview
};

// Exportação plana para compatibilidade com código existente
export {
  // Chef Images
  chefProfile,
  chefAmelie,
  chefSofia,
  
  // Quiz Images
  etapa01,
  etapa02,
  etapa07,
  
  // Recipe Images
  recipeBook,
  recipeCollage,
  recipesGrid,
  recipesGridCollage,
  recipesMain,
  recipes,
  perfilChefSofiaBook,
  perfilChefSofia,
  
  // Testimonial Images
  testimonial1,
  testimonial2,
  testimonial3,
  testimonial4,
  testimonial5,
  testimonial6,
  testimonial7,
  testimonialBread,
  testimonialBrownie,
  imagePageOffer,
  
  // Thank You Page Images
  thankYouPage,
  audioPreview
};