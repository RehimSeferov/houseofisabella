import React from "react";
import "./LuxurySection.scss";

const LuxurySection: React.FC = () => {
  return (
    <section className="luxury-section">
      <div className="big-ampersand">&</div>
      <div className="content">
        <span className="subtitle">STYLE LUXURY</span>
        <h2 className="title">AT AFFORDABLE PRICES</h2>
      </div>
    </section>
  );
};

export default LuxurySection;
