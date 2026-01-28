import React from "react";
import "./NewArrivalsOutletSection.scss";

const newArrivalsImg =
  "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2574&auto=format&fit=crop"; 
const outletImg =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2664&auto=format&fit=crop"; 

const NewArrivalsOutletSection: React.FC = () => {
  return (
    <section className="new-arrivals-outlet-section">
      <div className="promo-container">

        <div className="promo-card">
          <img src={newArrivalsImg} alt="New Arrivals" className="bg-image" />
          <div className="content-overlay">
            <h3 className="promo-title">THOUSANDS OF NEW ARRIVALS</h3>
            <p className="promo-subtitle">
              Just Landed
              <br />
              With Free UK Mainland Delivery*
            </p>
            <button className="promo-btn">SHOP NOW</button>
          </div>
        </div>


        <div className="promo-card">
          <img src={outletImg} alt="Outlet Sale" className="bg-image" />
          <div className="content-overlay">
            <h3 className="promo-title">OUTLET SALE</h3>
            <p className="promo-subtitle">
              Discover exclusive offers in our OUTLET department, featuring
              one-time deals with discounts of up to 75% off the RRP. Don't miss
              out—shop now!
            </p>
            <button className="promo-btn">OUTLET</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsOutletSection;
