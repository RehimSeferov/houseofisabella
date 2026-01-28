import React, { useRef } from "react";
import "./ShopByStyleSection.scss";


import coastalImg from "../../image/coastal.jpg";


const stylesData = [
  {
    id: 1,
    title: "COASTAL",
    link: "#coastal",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },
  {
    id: 2,
    title: "JAPANDI",
    link: "#japandi",
    imageUrl: coastalImg,
    subtitle: "EXPLORE",
  },
  {
    id: 3,
    title: "TRANSITIONAL",
    link: "#transitional",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },

  {
    id: 4,
    title: "BOHO CHIC",
    link: "#boho",
    imageUrl: coastalImg,
    subtitle: "DISCOVER",
  },
  {
    id: 5,
    title: "SCANDINAVIAN",
    link: "#scandi",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },
  {
    id: 6,
    title: "SCANDINAVIAN",
    link: "#scandi",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },
  {
    id: 7,
    title: "SCANDINAVIAN",
    link: "#scandi",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },
  {
    id: 8,
    title: "SCANDINAVIAN",
    link: "#scandi",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },
  {
    id: 9,
    title: "SCANDINAVIAN",
    link: "#scandi",
    imageUrl: coastalImg,
    subtitle: "SHOP NOW",
  },
];

const ShopByStyleSection: React.FC = () => {

  const sliderRef = useRef<HTMLDivElement>(null);


  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {

      const scrollAmount = sliderRef.current.clientWidth / 3;

      if (direction === "left") {

        sliderRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {

        sliderRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="shop-by-style-section">

      <div className="section-header-wrapper">
        <h2 className="section-title">SHOP BY STYLE</h2>
        <a href="#all" className="explore-all-link">
          EXPLORE ALL
        </a>
      </div>

      <div className="style-slider-wrapper" ref={sliderRef}>
        <div className="style-grid">
          {stylesData.map((style) => (
            <a href={style.link} key={style.id} className="style-card">
              <div className="card-image-wrapper">
                <img
                  src={style.imageUrl}
                  alt={style.title}
                  className="card-image"
                />
                <div className="card-overlay">
                  <h4 className="card-main-title">{style.title}</h4>
                  <span className="card-subtitle">{style.subtitle}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>


      <div className="pagination-arrows">
        <button
          className="arrow-btn prev-btn"
          onClick={() => handleScroll("left")}
          aria-label="Previous style"
        >
          ←
        </button>
        <button
          className="arrow-btn next-btn"
          onClick={() => handleScroll("right")}
          aria-label="Next style"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default ShopByStyleSection;
