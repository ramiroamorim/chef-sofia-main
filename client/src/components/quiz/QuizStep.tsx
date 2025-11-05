import { motion } from "framer-motion";
import RadioOption from "@/components/quiz/RadioOption";
import Testimonial from "@/components/quiz/Testimonial";
import { QuizStepType } from "@/types/quiz";
import { testimonials } from "@/data";
import { RecipeImages } from "@/assets/imageExports";

interface QuizStepProps {
  step: QuizStepType;
  stepNumber: number;
  isVisible: boolean;
  answers?: { [key: string]: string };
  currentStepAnswer?: string | null;
  onOptionSelect: (name: string, value: string) => void;
  onNextStep: () => void;
}

export default function QuizStep({ 
  step, 
  stepNumber, 
  isVisible, 
  answers = {},
  currentStepAnswer = null,
  onOptionSelect, 
  onNextStep 
}: QuizStepProps) {
  if (!isVisible) return null;
  
  // Special layout for landing page (step 0)
  if (step.name === 'landing') {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="quiz-step landing-page text-center w-full pt-3 sm:pt-12 pb-2 sm:pb-16 px-3 sm:px-8 min-h-screen bg-white flex flex-col justify-center"
      >
        {/* Título principal - Aumentado para melhor legibilidade */}
        {step.title && (
          <h1 className="text-[clamp(20px,5vw,28px)] sm:text-5xl md:text-6xl font-bold text-[#E07260] mb-1 sm:mb-6 text-center w-full leading-[1.25] max-w-4xl mx-auto">
            {step.title}
          </h1>
        )}

        {/* Blocos de texto organizados - Aumentados para melhor legibilidade */}
        {step.textBlocks && (
          <div className="text-blocks mb-1 sm:mb-10 max-w-3xl mx-auto">
            {step.textBlocks.map((text, i) => (
              text.isSubtitle ? (
                <h2
                  key={i}
                  className="text-[clamp(18px,4.5vw,24px)] sm:text-4xl md:text-5xl font-bold text-[#E07260] mb-1 sm:mb-6 text-center w-full leading-[1.3]"
                  dangerouslySetInnerHTML={{ __html: text.content }}
                />
              ) : (
                <p
                  key={i}
                  className={
                    text.highlight
                      ? "text-primary font-medium text-[clamp(14px,3.5vw,16px)] sm:text-base md:text-lg text-center mb-0.5 sm:mb-4 leading-[1.35]"
                      : "text-[clamp(14px,3.5vw,16px)] sm:text-base md:text-lg text-center mb-0.5 sm:mb-4 leading-[1.35]"
                  }
                  dangerouslySetInnerHTML={{ __html: text.content }}
                />
              )
            ))}
          </div>
        )}

        {/* Imagem principal - Aumentada para melhor visualização */}
        {step.image && (
          <div className="my-1 sm:my-10 max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto">
            <img
              src={step.image}
              alt={step.imageAlt || ""}
              className="w-full h-auto rounded-lg sm:max-h-[400px]"
              loading="eager"
              decoding="async"
              style={{ 
                objectFit: 'contain',
                maxHeight: 'clamp(160px, 20vh, 200px)'
              }}
            />
          </div>
        )}

        {/* Seta - Tamanho aumentado */}
        <div className="arrow-down text-[clamp(16px,4vw,20px)] sm:text-3xl text-[#5da868] my-0.5 sm:my-6">▼</div>

        {/* Botão CTA - Tamanho aumentado */}
        {step.buttonText && (
          <div className="relative w-full sm:w-auto sm:mx-auto mt-1 sm:mt-6 mb-1 sm:mb-6 max-w-2xl mx-auto">
            <button
              className="btn-primary btn-pulse w-full sm:w-auto sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 font-medium text-[clamp(14px,3.5vw,16px)] sm:text-base md:text-lg mx-auto block rounded-full"
              onClick={onNextStep}
            >
              {step.buttonText}
            </button>
          </div>
        )}

        {/* Footer - Tamanho aumentado */}
        {step.footerText && (
          <div className="footer-text text-[clamp(12px,3vw,14px)] sm:text-sm text-[#666] mt-0 sm:mt-6 text-center leading-[1.3] max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: step.footerText }}></div>
        )}
      </motion.div>
    );
  }

  // Special layout for optimized sales step
  if (step.isOptimizedSalesStep) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="quiz-step px-3 sm:px-4 flex flex-col justify-center min-h-screen"
      >
        <div className="bg-[#FFF8F5] p-4 sm:p-5 rounded-md mb-4 sm:mb-6">
          <h1 style={{ 
            fontFamily: 'Georgia, "Times New Roman", serif', 
            fontStyle: 'italic', 
            color: '#B34431', 
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            lineHeight: '1.35', 
            marginBottom: '1rem', 
            fontWeight: 'normal' 
          }}>
            <span className="block">{step.title}</span>
            <span className="block">{step.subtitle}</span>
          </h1>
          
          <div className="mt-3 sm:mt-3">
            {step.bulletPoints && step.bulletPoints.map((point, i) => (
              <p key={i} className="mb-2 text-[clamp(15px,3.8vw,17px)] sm:text-base leading-relaxed">{point}</p>
            ))}
            
            {step.description && (
              <p 
                className="mb-2 text-[clamp(15px,3.8vw,17px)] sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            )}
          </div>
        </div>
        
        {step.buttonText && (
          <div className="text-center">
            <button 
              className="btn-primary btn-pulse w-full sm:w-auto py-3.5 sm:py-3 px-8 sm:px-8 font-medium text-[clamp(15px,4vw,18px)] sm:text-base rounded-full"
              onClick={onNextStep}
            >
              {step.buttonText}
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  // Special layout for testimonial step
if (step.isTestimonialStep) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="quiz-step px-3 flex flex-col min-h-screen pt-3 justify-center"
    >
      {/* Title with highlighted text - Aumentado */}
      {step.title && (
        <h2 className="text-[clamp(13px,3.2vw,15px)] sm:text-base font-medium mb-3 text-center leading-relaxed">
          <span className="text-primary font-semibold">Centinaia di donne </span>
          <span className="text-[#333333]">hanno già provato queste ricette e hanno visto il loro corpo trasformarsi.</span>
        </h2>
      )}

      {/* Testimonial Component - sem espaços extras */}
      <div className="flex-1 flex items-start justify-center">
        <Testimonial 
          testimonials={testimonials}
          onComplete={onNextStep}
        />
      </div>
    </motion.div>
  );
}

  // Standard layout for quiz steps
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="quiz-step px-3 sm:px-4 flex flex-col justify-between min-h-screen py-2"
    >
      {/* Conteúdo principal */}
      <div className="content-main flex-1 flex flex-col justify-center space-y-2">
      {/* Layout otimizado para Chef Profile */}
      {step.name === 'chef_profile' && (
        <div className="w-full flex flex-col items-center justify-center text-center">
          {/* Title aumentado para chef profile */}
          {step.title && (
            <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-center w-full leading-tight">
              <span dangerouslySetInnerHTML={{ __html: step.title }} />
            </div>
          )}
          {/* Description com tamanho aumentado */}
          {step.description && (
            <p 
              className="text-xs sm:text-sm text-center mb-0.5 sm:mb-1.5 w-full leading-snug" 
              dangerouslySetInnerHTML={{ __html: step.description }}
            />
          )}
          {/* Image centralizada */}
          {step.image && (
            <div className="flex justify-center w-full">
              <img 
                src={step.image} 
                alt={step.imageAlt || ""} 
                className="w-full max-w-md h-auto rounded-lg mb-0.5 sm:mb-2 mx-auto"
                loading="eager"
                decoding="async"
                style={{ 
                  maxHeight: "140px",
                  objectFit: "contain"
                }}
              />
            </div>
          )}
          {/* Text Blocks com tamanho otimizado para Chef Profile */}
          {step.textBlocks && (
            <div className="space-y-0.5 sm:space-y-1.5 text-[#555555] px-2 w-full">
              {step.textBlocks.map((text, i) => (
                <motion.p 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={text.highlight ? "text-primary font-medium text-xs sm:text-sm text-left sm:text-center leading-snug" : "text-xs sm:text-sm text-left sm:text-center leading-snug"}
                  dangerouslySetInnerHTML={{ __html: text.content }}
                />
              ))}
            </div>
          )}
          {/* Button do Chef Profile diretamente após o texto */}
          {step.buttonText && !step.options && (
            <div className="w-full mt-1.5 sm:mt-3 flex justify-center">
              <button 
                className="btn-primary btn-pulse w-full max-w-md py-2 sm:py-4 px-4 sm:px-10 flex items-center justify-center text-xs sm:text-base font-medium" 
                onClick={onNextStep}
              >
                <span className="text-center leading-tight">👉 {step.buttonText}</span>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Title aumentado para etapa improve */}
      {step.title && step.name === 'improve' && (
        <div className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-center leading-tight" style={{ lineHeight: '1.2' }}>
          <span dangerouslySetInnerHTML={{ __html: step.title }} />
        </div>
      )}
      {/* Title menor para etapa recipes_experience */}
      {step.title && step.name === 'recipes_experience' && (
        <div className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-center leading-tight" style={{ lineHeight: '1.2' }}>
          <span dangerouslySetInnerHTML={{ __html: step.title }} />
        </div>
      )}
      {/* Layout especial para etapa result */}
      {step.name === 'result' && (
        <div className="profile-result max-w-md mx-auto my-2 sm:my-6 md:my-8 px-3 sm:px-6">
          <h2 className="text-sm sm:text-lg font-bold mb-0.5 sm:mb-1.5 text-primary leading-tight">Il tuo profilo gourmet:</h2>
          <h3 className="text-base sm:text-xl font-normal text-[#333333] mb-2 sm:mb-6 md:mb-8 leading-tight">{step.title}</h3>
          
          {step.textBlocks && (
            <div className="space-y-1.5 sm:space-y-5 md:space-y-6 text-[#333333] text-left">
              {step.textBlocks.map((text, i) => (
                <p 
                  key={i} 
                  className="text-[11px] sm:text-sm md:text-base leading-snug"
                  dangerouslySetInnerHTML={{ __html: text.content }}
                />
              ))}
            </div>
          )}
          
          {step.buttonText && (
            <div className="mt-2 sm:mt-6 md:mt-8">
              <div className="relative inline-block w-full mb-1 sm:mb-3">
                <div className="absolute inset-0 rounded-full opacity-30" 
                  style={{
                    background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
                    animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
                  }}
                ></div>
                <button 
                  className="relative w-full py-2 sm:py-3 px-4 sm:px-7 rounded-full text-xs sm:text-base font-medium text-white"
                  style={{
                    background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
                    boxShadow: "0 4px 15px rgba(224, 114, 96, 0.3)"
                  }}
                  onClick={onNextStep}
                >
                  {step.buttonText}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Title padrão para outros steps */}
      {step.title && step.name !== 'chef_profile' && step.name !== 'landing' && step.name !== 'improve' && step.name !== 'recipes_experience' && step.name !== 'result' && (
        <div className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2 text-center leading-tight">
          <span dangerouslySetInnerHTML={{ __html: step.title }} />
        </div>
      )}
      {/* Description padrão */}
      {step.description && step.name !== 'chef_profile' && (
        <p 
          className="text-[11px] sm:text-xs text-center mb-1 sm:mb-2 leading-snug" 
          dangerouslySetInnerHTML={{ __html: step.description }}
        />
      )}
      {/* Image específica para temptations step */}
      {step.image && step.name === 'temptations' && (
        <img 
          src={step.image} 
          alt={step.imageAlt || ""} 
          className="w-full max-w-md h-auto rounded-lg mb-2 sm:mb-3 mx-auto"
          loading="eager"
          decoding="async"
          style={{ 
            maxHeight: "300px",
            objectFit: "contain"
          }}
        />
      )}
      {/* Image padrão para outros steps */}
      {step.image && step.name !== 'chef_profile' && step.name !== 'temptations' && (
        <img 
          src={step.image} 
          alt={step.imageAlt || ""} 
          className="w-full max-w-md h-auto rounded-lg mb-2 sm:mb-3 mx-auto"
          loading="eager"
          decoding="async"
          style={{ 
            maxHeight: "200px",
            objectFit: "contain"
          }}
        />
      )}
      {/* Image Grid com otimização */}
      {step.imageGrid && (
        <div className="flex justify-center my-2 sm:my-3">
          {step.imageGrid.map((img, i) => (
            <img 
              key={i}
              src={img.src} 
              alt={img.alt} 
              className="w-full max-w-md h-auto rounded-lg mx-auto"
              loading="eager"
              decoding="async"
              style={{ 
                maxHeight: "180px",
                objectFit: "contain"
              }}
            />
          ))}
        </div>
      )}
      {/* Text Blocks padrão para outros steps */}
      {step.textBlocks && step.name !== 'chef_profile' && step.name !== 'result' && (
        <div className="space-y-0.5 sm:space-y-2 text-[#555555]">
          {step.textBlocks.map((text, i) => (
            <p 
              key={i} 
              className={text.highlight ? "text-primary font-medium text-[11px] sm:text-xs leading-snug" : "text-[11px] sm:text-xs leading-snug"}
              dangerouslySetInnerHTML={{ __html: text.content }}
            />
          ))}
        </div>
      )}
      {/* Options */}
      {step.options && (
        <div className="space-y-1 sm:space-y-2 mt-1.5 sm:mt-3">
          {step.options.map((option, i) => (
            <RadioOption 
              key={`${step.name}-${option.value}-${stepNumber}-${currentStepAnswer || 'none'}`}
              name={step.name}
              value={option.value}
              label={option.label}
              isSelected={currentStepAnswer === option.value}
              onSelect={() => onOptionSelect(step.name, option.value)}
            />
          ))}
        </div>
      )}
      </div>

      {/* Botões fixos na parte inferior */}
      <div className="button-area flex-shrink-0 pb-2">
        {/* Button padrão para outros steps */}
        {step.buttonText && !step.options && step.name !== 'chef_profile' && step.name !== 'result' && (
          <div className="relative w-full">
            <div className="absolute inset-0 rounded-full opacity-30" 
              style={{
                background: "linear-gradient(90deg, #E78D7B 0%, #E07260 100%)",
                animation: "ping 3s cubic-bezier(0.66, 0, 0, 1) infinite"
              }}
            ></div>
            <button 
              className="btn-primary relative w-full py-2 px-4 flex items-center justify-center z-10 text-xs font-medium" 
              onClick={onNextStep}
            >
              <span>{step.buttonText}</span>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
