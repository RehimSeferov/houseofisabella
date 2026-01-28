import React, { useRef } from "react";
import "./FeaturedCollectionSection.scss";

const products = [
  {
    id: 1,
    brand: "Tommy Franks",
    name: "Sims Bedside Table",
    price: "£589.00",
    imageUrl:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    brand: "Tommy Franks",
    name: "Ponce Bench",
    price: "£395.00",
    imageUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/tommy-franks-living-ponce-bench-chex-polar-boucle-house-of-isabella-uk-1181001454.png?v=1753585134&width=480",
  },
  {
    id: 3,
    brand: "Tommy Franks",
    name: "Vertu Bedside Table",
    price: "£790.00",
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    brand: "Tommy Franks",
    name: "Tavamo Dining Table",
    price: "£1,850.00",
    imageUrl:
      "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2000&auto=format&fit=crop",
  },

  {
    id: 5,
    brand: "Eichholtz",
    name: "Novak Chair",
    price: "£1,250.00",
    imageUrl:
      "https://houseofisabella.co.uk/cdn/shop/files/tommy-franks-dining-tavamo-dining-table-oval-walnut-house-of-isabella-uk-1212510124.jpg?v=1767988777&width=480",
  },
  {
    id: 6,
    brand: "Liang & Eimil",
    name: "Kross Side Table",
    price: "£420.00",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 7,
    brand: "Hudson Valley",
    name: "Sputnik Chandelier",
    price: "£2,100.00",
    imageUrl:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 8,
    brand: "Caracole",
    name: "Classic Sofa",
    price: "£3,400.00",
    imageUrl:
      "https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=2000&auto=format&fit=crop",
  },
];

const FeaturedCollectionSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);


  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 350; 
      if (direction === "left") {
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="featured-collection-section">
      <div className="section-header">
        <h2 className="section-title">FEATURED COLLECTION</h2>
      </div>

      <div className="products-slider-wrapper">
        <div className="products-grid" ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <div className="product-name-group">
                  <span className="brand-name">{product.brand}</span>
                  <span className="item-name"> - {product.name}</span>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="pagination-arrows">
        <button className="arrow-btn prev-btn" onClick={() => scroll("left")}>
          ←
        </button>
        <button className="arrow-btn next-btn" onClick={() => scroll("right")}>
          →
        </button>
      </div>
    </section>
  );
};

export default FeaturedCollectionSection;
