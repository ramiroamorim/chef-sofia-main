import React, { memo } from "react";

export const ChefSignature = memo(() => (
  <div className="text-center mb-6 mt-12 pt-4 pb-2" style={{ maxWidth: "800px", margin: "0 auto" }}>
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.95rem", 
        marginBottom: "10px", 
        color: "#666666", 
        lineHeight: "1.8"
      }}
    >
      Con tutto il mio cuore — perché tu possa finalmente mangiare con libertà e piacere.
    </p>
    <p 
      style={{ 
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "1.05rem", 
        fontStyle: "italic", 
        fontWeight: "500", 
        color: "#B34431"
      }}
    >
      Chef Sofia Moretti
    </p>
  </div>
));

ChefSignature.displayName = "ChefSignature";
