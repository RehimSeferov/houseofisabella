import React from "react";
import "./FeaturedBrandsSection.scss";


const brands = [
  {
    id: 1,
    name: "Berkeley Designs",
    img: "https://houseofisabella.co.uk/cdn/shop/files/3-13_bf093646-d43a-421e-9136.jpg?v=1738716124",
  },
  {
    id: 2,
    name: "Bodhi",
    img: "https://houseofisabella.co.uk/cdn/shop/files/bodhi-logo_fce9998d-0d9f-41c7-bf14-030be0527748.jpg?v=1714481870",
  },
  {
    id: 3,
    name: "Caracole",
    img: "https://houseofisabella.co.uk/cdn/shop/files/caracole-logo-modified.jpg?v=1738728773",
  },
  {
    id: 4,
    name: "DI Designs",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Untitled_design-39_200x60_2x_2_-modified.jpg?v=1765266109",
  },
  {
    id: 5,
    name: "Dolni",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 6,
    name: "Eccotrading",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 7,
    name: "Eichholtz",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 8,
    name: "Elstead Lighting",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 9,
    name: "Fairmont",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 10,
    name: "Garden Trading",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 11,
    name: "Hamilton Interiors",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 12,
    name: "Hudson Valley",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 13,
    name: "Jonathan Charles",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 14,
    name: "Keiichi",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 15,
    name: "Liang & Eimil",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 16,
    name: "Malini",
    img: "https://houseofisabella.co.uk/cdn/shop/files/Thordore_Alexander-logo.jpg?v=1642740545",
  },
  {
    id: 17,
    name: "Maze",
    img: "https://placehold.co/140x40/white/black?text=maze",
  },
  {
    id: 18,
    name: "Light & Living",
    img: "https://placehold.co/140x50/white/black?text=Light+%26+Living",
  },
  {
    id: 19,
    name: "Noosa & Co.",
    img: "https://placehold.co/140x40/white/black?text=Noosa+%26+Co.",
  },
  {
    id: 20,
    name: "Pacific Lifestyle",
    img: "https://placehold.co/140x50/white/black?text=Pacific+Lifestyle",
  },
  {
    id: 21,
    name: "Richmond Interiors",
    img: "https://placehold.co/140x50/white/black?text=Richmond",
  },
  {
    id: 22,
    name: "Rowen Homes",
    img: "https://placehold.co/140x40/white/black?text=Rowen+Homes",
  },
  {
    id: 23,
    name: "Spicers of Hythe",
    img: "https://placehold.co/140x60/white/black?text=SPICERS",
  },
  {
    id: 24,
    name: "Theodore Alexander",
    img: "https://placehold.co/140x50/white/black?text=THEODORE",
  },
  {
    id: 25,
    name: "Tommy Franks",
    img: "https://placehold.co/140x40/white/black?text=TOMMY+FRANKS",
  },
  {
    id: 26,
    name: "Tree Locate",
    img: "https://placehold.co/140x40/white/black?text=TREELOCATE",
  },
  {
    id: 27,
    name: "Twenty10 Designs",
    img: "https://placehold.co/140x50/white/black?text=twenty10",
  },
  {
    id: 28,
    name: "Uttermost",
    img: "https://placehold.co/140x40/white/black?text=UTTERMOST",
  },
];

const FeaturedBrandsSection: React.FC = () => {
  return (
    <section className="featured-brands-section">
      <div className="section-header">
        <h3 className="section-title">FEATURED BRANDS</h3>
      </div>

      <div className="brands-container">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-item">
            <img src={brand.img} alt={brand.name} className="brand-logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrandsSection;
