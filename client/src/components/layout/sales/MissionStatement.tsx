import React, { memo } from "react";

export const MissionStatement = memo(() => (
  <div 
    style={{
      backgroundColor: "#FFF9F3", 
      padding: "24px 16px",
      marginBottom: "24px",
      borderRadius: "12px",
      border: "1px solid #F5E9DE",
      borderLeft: "4px solid #B34431"
    }}
  >
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem",
        lineHeight: "1.8",
        color: "#333333",
        marginBottom: "12px",
        fontWeight: "normal"
      }}
    >
      Non è una dieta. Non è una promessa vuota.
    </p>
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem",
        lineHeight: "1.8",
        color: "#333333",
        marginBottom: "12px",
        fontWeight: "normal"
      }}
    >
      È una scorciatoia verso ciò che desideri da anni:<br />
      mangiare con piacere, <span style={{ color: "#B34431", fontWeight: "600" }}>senza dolore</span>.
    </p>
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem",
        lineHeight: "1.8",
        color: "#333333",
        marginBottom: "0",
        fontWeight: "normal"
      }}
    >
      E oggi… ti costa meno di un piatto insipido al ristorante.
    </p>
  </div>
));

MissionStatement.displayName = "MissionStatement";
