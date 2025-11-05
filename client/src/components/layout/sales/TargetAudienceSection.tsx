import React, { memo } from "react";

export const TargetAudienceSection = memo(() => (
  <>
    <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-md border-l-4 bg-[#F1F9F1] border-[#57C084]">
      <h3 className="text-lg font-bold text-[#57C084] mb-2">💚 È per te se...</h3>
      <ul className="list-none p-0 m-0 space-y-1 text-sm leading-relaxed">
        <li>🌿 Hai intolleranze (glutine, lattosio, zucchero)</li>
        <li>🥗 Vuoi dimagrire senza frustrazione né rinunce impossibili</li>
        <li>😩 Sei stanca di piatti tristi, insipidi o industriali</li>
        <li>✨ Cerchi un metodo semplice, duraturo, umano</li>
      </ul>
    </div>

    <div className="mb-5 p-3 sm:p-4 rounded-md border-l-4 bg-[#FFF5F5] border-[#F44336]">
      <h3 className="text-lg font-bold text-[#F44336] mb-2">🚫 Non è per te se...</h3>
      <ul className="list-none p-0 m-0 space-y-1 text-sm leading-relaxed">
        <li>🙅‍♀️ Non vuoi cambiare nemmeno una minima abitudine</li>
        <li>🧪 Cerchi una pillola magica che "risolve tutto"</li>
        <li>🌀 Preferisci restare nel caos alimentare</li>
        <li>🍕 Rifiuti anche solo l'idea di cucinare un minimo</li>
      </ul>
    </div>
  </>
));

TargetAudienceSection.displayName = "TargetAudienceSection";
