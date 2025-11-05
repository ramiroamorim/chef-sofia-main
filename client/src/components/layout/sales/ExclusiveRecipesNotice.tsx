import React, { memo } from "react";

export const ExclusiveRecipesNotice = memo(() => (
  <div 
    style={{
      backgroundColor: "#FFF1EE", 
      padding: "24px 16px",
      marginBottom: "20px",
      borderRadius: "12px",
      border: "1px solid #F5DED9",
      borderLeft: "4px solid #B34431"
    }}
  >
    <p 
      style={{ 
        fontFamily: "Georgia, serif", 
        fontStyle: "italic",
        color: "#B34431",
        fontSize: "1.05rem",
        lineHeight: "1.3",
        marginBottom: "16px",
        textAlign: "center",
        fontWeight: "bold"
      }}
    >
      Queste ricette non le troverai su Google.
    </p>
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem",
        lineHeight: "1.8",
        textAlign: "center",
        color: "#333333",
        margin: "0"
      }}
    >
      Sono nate nella vera cucina di Sofia — non su Pinterest, né su un blog copiato e incollato.<br />
      Ogni piatto è stato pensato per calmare, nutrire… e restituire il piacere a chi aveva ormai rinunciato
    </p>
  </div>
));

ExclusiveRecipesNotice.displayName = "ExclusiveRecipesNotice";
