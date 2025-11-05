import React, { memo } from "react";

export const BonusSection = memo(() => (
  <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-md border-l-4 bg-[#FFF8E8] border-[#FF9800]">
    <h2 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "1.05rem", 
        fontWeight: "700", 
        color: "#FF9800", 
        marginBottom: "10px" 
      }}
    >
      🎁 BONUS ESCLUSIVI OGGI:
    </h2>
    
    <ul 
      style={{
        listStyle: "none",
        padding: "0",
        margin: "0",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <li style={{ marginBottom: "12px" }}>
        <p style={{ fontSize: "0.95rem", fontWeight: "bold", margin: "0 0 4px 0", lineHeight: "1.8" }}>
          🎁 Bonus 1: Guida alle sostituzioni intelligenti
        </p>
        <p style={{ fontSize: "0.95rem", marginLeft: "1rem", margin: "0", lineHeight: "1.8" }}>
          Sostituisci zucchero, farina e latte senza perdere sapore
        </p>
      </li>
      <li style={{ marginBottom: "12px" }}>
        <p style={{ fontSize: "0.95rem", fontWeight: "bold", margin: "0 0 4px 0", lineHeight: "1.8" }}>
          🎁 Bonus 2: Mappa della sazietà naturale
        </p>
        <p style={{ fontSize: "0.95rem", marginLeft: "1rem", margin: "0", lineHeight: "1.8" }}>
          Componi piatti che saziano senza eccessi né ansia
        </p>
      </li>
      <li style={{ marginBottom: "12px" }}>
        <p style={{ fontSize: "0.95rem", fontWeight: "bold", margin: "0 0 4px 0", lineHeight: "1.8" }}>
          🎁 Bonus 3: Protocollo intestino + glicemia
        </p>
        <p style={{ fontSize: "0.95rem", marginLeft: "1rem", margin: "0", lineHeight: "1.8" }}>
          Ritrova energia e digestione stabile ogni giorno
        </p>
      </li>
      <li style={{ marginBottom: "0" }}>
        <p style={{ fontSize: "0.95rem", fontWeight: "bold", margin: "0 0 4px 0", lineHeight: "1.8" }}>
          🎁 Bonus 4: Lista della spesa intelligente
        </p>
        <p style={{ fontSize: "0.95rem", marginLeft: "1rem", margin: "0", lineHeight: "1.8" }}>
          Risparmia tempo con ingredienti semplici, testati, approvati
        </p>
      </li>
    </ul>
  </div>
));

BonusSection.displayName = "BonusSection";
