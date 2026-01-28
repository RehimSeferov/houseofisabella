import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiHeart,
  FiCheck,
  FiTruck,
  FiShield,
  FiGlobe,
  FiChevronRight,
  FiStar,
  FiArrowLeft,
  FiArrowRight,
  FiMaximize2,
} from "react-icons/fi";
import {
  fetchProductById,
  fetchProducts,
  getImageUrl,
} from "../../services/productService";
import "./ProductDetailsPage.scss";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface Product {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  availability?: string;
  material?: string;
}

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); 


  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "delivery"
  >("description");

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (id) {
        try {
          const data = await fetchProductById(id);
          setProduct(data);

          const img = getImageUrl(data.image);
          setGalleryImages([img, img, img, img]);
          setSelectedImage(img);
          if (data && data.category) {
            try {
              const relatedData = await fetchProducts({
                limit: 8,
                page: 1,
                categories: [data.category],
                sort: "date-desc",
                brands: [],
                colors: [],
                sizes: [],
                tags: [],
              });

              if (
                relatedData &&
                relatedData.data &&
                Array.isArray(relatedData.data)
              ) {
                setRelatedProducts(
                  relatedData.data.filter((p: Product) => p._id !== id)
                );
              }
            } catch (relError) {
              console.warn("Related products could not be loaded:", relError);
            }
          } else {
            console.log("Category not found, skipping related products.");
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
      setLoading(false);
    };

    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleNext = () => {
    if (currentIndex + 4 < relatedProducts.length)
      setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const isFavorite = product ? isInWishlist(product._id) : false;

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isFavorite) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading)
    return (
      <div className="product-details-page">
        <div className="loading-msg">Loading...</div>
      </div>
    );
  if (!product)
    return (
      <div className="product-details-page">
        <div className="error-msg">Product not found!</div>
      </div>
    );

  const installmentPrice = (product.price / 3).toFixed(2);
  const clearpayPrice = (product.price / 4).toFixed(2);

  return (
    <div className="product-details-page">
      <div className="container">

        <div className="product-main-layout">

          <div className="product-gallery">
            <div className="breadcrumbs">
              <Link to="/">HOME</Link> <FiChevronRight />
              <Link to="/shop">SHOP</Link> <FiChevronRight />
              <span className="current">{product.name}</span>
            </div>

            <div className="thumbnail-list">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${
                    selectedImage === img ? "active" : ""
                  }`}
                  onMouseEnter={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`Thumb ${index}`} />
                </div>
              ))}
            </div>

            <div className="main-image-container">
              <img
                className="main-img"
                src={selectedImage}
                alt={product.name}
              />

              {product.availability === "Out of stock" && (
                <div className="sold-out-badge">SOLD OUT</div>
              )}

              <button className="zoom-btn">
                <FiMaximize2 />
              </button>
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <div className="brand-name">{product.brand}</div>

            <div className="price-wrapper">
              <span className="product-price">£{product.price.toFixed(2)}</span>
            </div>

            <div className="delivery-status">
              {product.availability === "Out of stock" ? (
                <span className="status-text red">Sold Out</span>
              ) : (
                <span className="status-text">
                  Usually delivered in 4-10 working days
                </span>
              )}
            </div>

            <div className="action-buttons">
              <div className="qty-box">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <input type="text" value={quantity} readOnly />
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button
                className={`add-btn ${
                  product.availability === "Out of stock" ? "disabled" : ""
                }`}
                disabled={product.availability === "Out of stock"}
                onClick={() => {
                  if (product) {
                    addToCart(product, quantity);
                  }
                }}
              >
                {product.availability === "Out of stock"
                  ? "SOLD OUT"
                  : "ADD TO BASKET"}
              </button>


              <button
                className={`wishlist-icon ${isFavorite ? "active" : ""}`}
                onClick={handleWishlistToggle}
                title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              >

                <FiHeart
                  fill={isFavorite ? "black" : "none"}
                  color={isFavorite ? "black" : "currentColor"}
                />
              </button>
            </div>

            <div className="installment-widget">
              Pay in 3 interest-free instalments of{" "}
              <strong>£{installmentPrice}</strong> with
              <span className="shop-pay-logo">
                <span className="shop">shop</span>
                <span className="pay">Pay</span>
              </span>
              <a href="#" className="view-plans">
                View sample plans
              </a>
            </div>


            <div className="clearpay-widget">
              or 4 interest-free payments of <strong>£{clearpayPrice}</strong>{" "}
              with
              <span className="clearpay-badge">
                clearpay <span className="logo-icon">⇌</span>
              </span>
              <span className="info-icon">ⓘ</span>
            </div>


            <div className="klarna-widget">
              <span className="klarna-badge">Klarna.</span>
              <span className="text-content">
                3 payments of <strong>£{installmentPrice}</strong> at 0%
                interest with Klarna
                <a href="#" className="learn-more">
                  Learn more
                </a>
              </span>
            </div>

            <div className="payment-gateways">
              <img
                src="https://cdn.shopify.com/s/files/1/0159/8662/2518/files/payment-shopay_460x.jpg?v=1658123674"
                alt="Payment Methods"
              />
            </div>


            <div className="product-tabs-section">
              <div className="tabs-nav">
                <button
                  className={activeTab === "description" ? "active" : ""}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={activeTab === "specifications" ? "active" : ""}
                  onClick={() => setActiveTab("specifications")}
                >
                  Specifications
                </button>
                <button
                  className={activeTab === "delivery" ? "active" : ""}
                  onClick={() => setActiveTab("delivery")}
                >
                  Delivery & Returns
                </button>
              </div>
              <div className="tabs-body">
                {activeTab === "description" && (
                  <div className="fade-in">
                    <p style={{ marginBottom: "10px" }}>
                      {product.description ||
                        `This sleek contemporary ${product.category.toLowerCase()} offers a stunning smooth design with lots of interesting detail.`}
                    </p>
                    <p>Perfect to add a modern touch to any home.</p>
                  </div>
                )}
                {activeTab === "specifications" && (
                  <div className="specs-grid fade-in">
                    <div className="row">
                      <strong>Brand:</strong> {product.brand}
                    </div>
                    <div className="row">
                      <strong>Material:</strong> {product.material || "Premium"}
                    </div>
                    <div className="row">
                      <strong>Category:</strong> {product.category}
                    </div>
                    <div className="row">
                      <strong>Code:</strong>{" "}
                      {product._id.substring(0, 8).toUpperCase()}
                    </div>
                  </div>
                )}
                {activeTab === "delivery" && (
                  <div className="fade-in">
                    <p>Standard Delivery: 1-3 Weeks.</p>
                    <p>Returns accepted within 30 days.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="trust-features">
              <div className="feature">
                <FiShield /> SECURE SHOPPING VIA CREDIT/DEBIT CARD
              </div>
              <div className="feature">
                <FiGlobe /> INTERNATIONAL DESIGNER BRANDS
              </div>
              <div className="feature">
                <FiCheck /> PRICE MATCH PROMISE <a href="#">MORE INFO</a>
              </div>
              <div className="feature">
                <FiTruck /> INTERNATIONAL DELIVERY QUOTABLE
              </div>
            </div>

            <div className="quick-links">
              <Link to="/shop">&lt; View All {product.brand}</Link>
              <Link to="/shop">&lt; View All {product.category}</Link>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="review-section-wrapper">
          <div className="review-box">
            <h2 className="reviews-title">CUSTOMER REVIEWS</h2>
            <div className="review-inner">
              <div className="left-col">
                <div className="stars-row">
                  <FiStar fill="black" /> <FiStar fill="black" />{" "}
                  <FiStar fill="black" /> <FiStar fill="black" />{" "}
                  <FiStar fill="black" />
                </div>
                <p className="no-review-text">Be the first to write a review</p>
              </div>
              <div className="divider-line"></div>
              <div className="right-col">
                <button className="black-btn">Write a review</button>
                <button className="white-btn">Ask a question</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="related-products-section">
        <div className="container">
          <h3 className="section-title">YOU MAY ALSO LIKE</h3>
          <div className="related-grid-wrapper">
            <div className="related-grid">
              {relatedProducts
                .slice(currentIndex, currentIndex + 4)
                .map((item) => (
                  <Link
                    to={`/product/${item._id}`}
                    key={item._id}
                    className="related-card"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="img-box">
                      <img src={getImageUrl(item.image)} alt={item.name} />
                    </div>
                    <div className="info-box">
                      <span className="brand">{item.brand}</span>
                      <span className="name">{item.name}</span>
                      <span className="price">£{item.price.toFixed(2)}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="slider-arrows">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="arrow-btn"
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + 4 >= relatedProducts.length}
              className="arrow-btn"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
