import React, { memo } from "react";

export const Header = memo(() => (
  <div className="bg-[#FFF8F5] p-4 sm:p-6 rounded-md mb-6 sm:mb-8">
    <h1 
      className="text-2xl sm:text-3xl leading-tight mb-4 font-normal italic text-[#B34431]" 
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <span className="block">500 ricette senza zucchero, senza glutine e senza lattosio</span>
      <span className="block">che nutrono, aiutano a dimagrire con piacere</span>
      <span className="block">e riportano il tuo corpo in equilibrio.</span>
    </h1>

    <div className="mt-3 sm:mt-4">
      <p className="mb-2 text-xs sm:text-sm leading-relaxed">
        Niente diete alla moda. Niente ingredienti impossibili da trovare. Niente piatti tristi.<br />
        Solo una cucina <strong>autentica, gustosa e liberatoria</strong> — per le donne con intolleranze 
        che vogliono <strong>ancora godersi il cibo, senza paura</strong>.
      </p>
    </div>
  </div>
));

Header.displayName = "Header";
