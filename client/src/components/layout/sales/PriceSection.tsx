import React, { memo } from "react";
import { COLORS } from "@/config";
import { GreenPulseButton } from "./GreenPulseButton";

interface PriceSectionProps {
  buyUrl: string;
}

export const PriceSection = memo(({ buyUrl }: PriceSectionProps) => (
  <div 
    className="py-5 sm:py-6 px-4 sm:px-6 text-center mb-6 sm:mb-8 rounded-lg border" 
    style={{ 
      backgroundColor: "#FFF5F5", 
      borderColor: "#FFE5E5" 
    }}
  >
    <p style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
      Valore reale del pacchetto: <span className="line-through">34€</span>
    </p>
    <p style={{ fontSize: "1.35rem", fontWeight: "bold", color: COLORS.PRIMARY, marginBottom: "1rem" }}>
      Oggi: solo 17€
    </p>
    <p style={{ fontSize: "1.05rem", fontWeight: "bold", color: COLORS.ERROR, marginBottom: "1.5rem" }}>
      ⚠️ Ultimi 20 accessi disponibili a 17€ soltanto!
    </p>
    
    <GreenPulseButton href={buyUrl}>
      👉🏻 VOGLIO IL PACCHETTO A 17€
    </GreenPulseButton>
    
    <p style={{ fontSize: "1.05rem" }}>
      📩 Consegna immediata via e-mail.<br />Nessun abbonamento. Nessun vincolo.
    </p>
  </div>
));

PriceSection.displayName = "PriceSection";
