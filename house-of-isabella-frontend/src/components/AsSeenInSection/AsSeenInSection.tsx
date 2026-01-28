import React from "react";
import "./AsSeenInSection.scss";


const logos = [
  {
    id: 1,
    name: "The Times",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/The_Guardian_logo_logotype_200x_40a6876b-ca82-4bd3-ab9f-2bb1ddba4d3e.png?height=48&v=1738718350",
  },
  {
    id: 2,
    name: "Country Homes",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/logo.jpg?height=48&v=1739391531",
  }, 
  {
    id: 3,
    name: "Grand Designs",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/Logo_1.jpg?height=48&v=1739391528",
  },
  {
    id: 4,
    name: "Ideal Home",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/The_Times_logo_wrodmark_200x_5192d05f-211d-4044-9317-7256cf84abab.png?height=48&v=1738718217",
  },
  {
    id: 5,
    name: "House & Garden",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/Country1_200x_967507b2-9f28-403a-8b24-298e3dbc8c5c.png?height=48&v=1738718054",
  },
  {
    id: 6,
    name: "Daily Mail",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/Composite_logo_200x_db027fef-e0fb-45f1-a3ad-92688b2cf90a.png?height=48&v=1738718052",
  },

  { id: 7, name: "AS SEEN IN", type: "text" },
  {
    id: 8,
    name: "The Guardian",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/logo-ideal-home_1_1.png?height=48&v=1649314054",
  },
  {
    id: 9,
    name: "Vogue",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/logo-ideal-home_1_1.png?height=48&v=1649314054",
  },
  {
    id: 9,
    name: "Vogue",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/logo.8d56970e20c5650a5bfa0fe2ceb8fbf71bea113f_1_1.png?height=48&v=1649314055",
  },
  {
    id: 9,
    name: "Vogue",
    imgUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/daily-mail-logo-png-transparent_200x_f83e4555-f273-406c-952b-d04b4538bb3b.png?height=48&v=1738718267",
  },
];

const AsSeenInSection: React.FC = () => {
  return (
    <section className="as-seen-in-section">
      <div className="logo-carousel">
        <div className="logo-track">
          {logos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="logo-item">
              {logo.type === "text" ? (
                <span className="as-seen-text">{logo.name}</span>
              ) : (
                <img src={logo.imgUrl} alt={logo.name} className="logo-image" />
              )}
            </div>
          ))}

          {logos.map((logo, index) => (
            <div key={`logo-2-${index}`} className="logo-item">
              {logo.type === "text" ? (
                <span className="as-seen-text">{logo.name}</span>
              ) : (
                <img src={logo.imgUrl} alt={logo.name} className="logo-image" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsSeenInSection;
