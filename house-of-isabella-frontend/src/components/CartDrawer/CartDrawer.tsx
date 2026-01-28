import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartDrawer.scss";

const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();



  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={closeCart}
      ></div>

      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="drawer-header">

          <button className="close-btn" onClick={closeCart}>
            <svg
              width="45"
              height="16"
              viewBox="0 0 45 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                d="M44.7071 8.70711C45.0976 8.31658 45.0976 7.68342 44.7071 7.29289L38.3431 0.928932C37.9526 0.538408 37.3195 0.538408 36.9289 0.928932C36.5384 1.31946 36.5384 1.95262 36.9289 2.34315L42.5858 8L36.9289 13.6569C36.5384 14.0474 36.5384 14.6805 36.9289 15.0711C37.3195 15.4616 37.9526 15.4616 38.3431 15.0711L44.7071 8.70711ZM0 9H44V7H0V9Z"
                fill="#111"
              />
            </svg>
          </button>
          <h2>MY CART</h2>
        </div>


        <div className="drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <p>Your Cart Is Empty</p>
              <button className="continue-btn" onClick={closeCart}>
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="item-img">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">£{item.price.toFixed(2)}</p>

                      <div className="qty-control">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-link"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="drawer-footer">
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span className="amount">£{cartTotal.toFixed(2)}GBP</span>
                </div>

                <button className="checkout-btn">CHECKOUT</button>
                <button className="view-cart-btn">VIEW CART</button>

                <p className="tax-note">
                  Tax included. <a href="#">Shipping</a> calculated at checkout.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
