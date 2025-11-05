import React, { memo } from "react";

export const WhatYouReceiveSection = memo(() => (
  <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-md border-l-4 bg-[#F5F9FF] border-[#2196F3]">
    <h2 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "1.05rem", 
        fontWeight: "700", 
        color: "#2196F3", 
        marginBottom: "10px" 
      }}
    >
      📦 Cosa ricevi subito:
    </h2>
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem", 
        marginBottom: "10px",
        lineHeight: "1.8"
      }}
    >
      Un accesso completo a <span style={{ color: "#B34431", fontWeight: "bold" }}>500 ricette esclusive</span>, 
      create e testate dalla Chef Sofia per:
    </p>
    
    <ul 
      style={{
        listStyle: "none",
        padding: "0 0 0 4px",
        margin: "0",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem",
        lineHeight: "1.8"
      }}
    >
      <li>🍽️ <span style={{ color: "#B34431", fontWeight: "bold" }}>100 colazioni & spuntini</span> — per iniziare la giornata senza picchi glicemici</li>
      <li>🥦 <span style={{ color: "#B34431", fontWeight: "bold" }}>300 pranzi & cene</span> — facili, nutrienti, antinfiammatori</li>
      <li>🍫 <span style={{ color: "#B34431", fontWeight: "bold" }}>100 dolci golosi</span> — senza zucchero raffinato, ma pieni di gusto</li>
      <li>🧭 <span style={{ color: "#B34431", fontWeight: "bold" }}>Ricette organizzate per obiettivo</span>: digestione, sazietà, energia, infiammazione</li>
    </ul>
  </div>
));

WhatYouReceiveSection.displayName = "WhatYouReceiveSection";
