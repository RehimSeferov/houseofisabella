import React, { useState } from "react";
import "./ShopPage.scss";
const products = [
  {
    id: 1,
    name: "Eichholtz Cesare Sofa",
    price: "£2,450.00",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
    brand: "Eichholtz",
  },
  {
    id: 2,
    name: "Bermuda Chandelier",
    price: "£895.00",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&auto=format&fit=crop",
    brand: "Hudson Valley",
  },
  {
    id: 3,
    name: "Caracole Adore Chair",
    price: "£1,250.00",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=600&auto=format&fit=crop",
    brand: "Caracole",
  },
  {
    id: 4,
    name: "Marble Coffee Table",
    price: "£650.00",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
    brand: "Liang & Eimil",
  },
  {
    id: 5,
    name: "Gold Wall Mirror",
    price: "£320.00",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=600&auto=format&fit=crop",
    brand: "RV Astley",
  },
  {
    id: 6,
    name: "Velvet Dining Chair",
    price: "£280.00",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop",
    brand: "Richmond",
  },
  {
    id: 7,
    name: "Abstract Art Piece",
    price: "£150.00",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600&auto=format&fit=crop",
    brand: "Uttermost",
  },
  {
    id: 8,
    name: "Table Lamp Gold",
    price: "£195.00",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    brand: "Elstead",
  },
  {
    id: 9,
    name: "Luxury Rug Beige",
    price: "£1,100.00",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
    brand: "Asiatic",
  },
];

const ShopPage: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1 className="page-title">ALL PRODUCTS</h1>
        <p className="page-desc">
          Discover our curated collection of luxury furniture, lighting, and
          home accessories.
        </p>
      </div>

      <div className="shop-container">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h4 className="filter-title">Categories</h4>
            <ul className="filter-list">
              <li>
                <label>
                  <input type="checkbox" /> Furniture (120)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Lighting (85)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Mirrors (40)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Accessories (200)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Rugs (35)
                </label>
              </li>
            </ul>
          </div>
          <div className="filter-group">
            <h4 className="filter-title">Price</h4>
            <div className="price-slider">
              <input type="range" min="0" max="5000" />
              <div className="price-labels">
                <span>£0</span>
                <span>£5,000+</span>
              </div>
            </div>
          </div>
          <div className="filter-group">
            <h4 className="filter-title">Brands</h4>
            <ul className="filter-list">
              <li>
                <label>
                  <input type="checkbox" /> Eichholtz
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Caracole
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Hudson Valley
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Liang & Eimil
                </label>
              </li>
            </ul>
          </div>
        </aside>
        <main className="shop-content">
          <div className="shop-topbar">
            <div className="result-count">Showing 1–9 of 120 results</div>
            <div className="sort-wrapper">
              <select className="sort-select">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>
          <div className={`products-grid ${view}`}>
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} />
                  <div className="card-actions">
                    <button className="quick-view">Quick View</button>
                    <button className="add-cart">Add to Cart</button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-brand">{product.brand}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <span className="page-num active">1</span>
            <span className="page-num">2</span>
            <span className="page-num">3</span>
            <span className="page-num next">Next →</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
