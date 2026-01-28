import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { getImageUrl } from "../../services/productService";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi"; 
import "./WishlistPage.scss";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item, 1);
    });
    alert("All items added to cart!");
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="page-title">MY WISHLIST</h1>

          <div className="action-buttons">
            <button className="action-btn">Share Wishlist</button>
            <button className="action-btn" onClick={clearWishlist}>
              Clear All
            </button>
            <button className="action-btn" onClick={handleAddAllToCart}>
              Add All
            </button>
          </div>
        </div>
        <div className="login-notice">
          Please <Link to="/login">login</Link> to save this Wishlist to your
          Account
        </div>
        {wishlistItems.length === 0 ? (
          <div className="empty-msg">
            <p>Your wishlist is currently empty.</p>
            <Link to="/shop" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item._id} className="wishlist-card">
                <div className="card-image">
                  <Link to={`/product/${item._id}`}>
                    <img src={getImageUrl(item.image)} alt={item.name} />
                  </Link>
                </div>
                <div className="card-info">
                  <h3 className="product-name">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </h3>
                  <div className="product-price">£{item.price.toFixed(2)}</div>

                  <div className="card-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(item, 1)}
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
