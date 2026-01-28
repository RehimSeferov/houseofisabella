import React from "react";
import "./GiftGuideSection.scss";

const GiftGuideSection: React.FC = () => {
  return (
    <section className="gift-guide-section">

      <div className="guide-col media-box">
        <video className="guide-video" autoPlay loop muted playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>


      <div className="guide-col content-box">
        <div className="text-wrapper">
          <h3 className="guide-title">THE HOUSE OF ISABELLA GIFT GUIDE</h3>

          <p className="guide-desc">
            Discover our curated collection of luxury homeware gifts,
            thoughtfully selected for home décor lovers and style enthusiasts.
            From elegant statement pieces to timeless everyday essentials, our
            gift guide offers inspiration for every budget. Explore the full
            range and find the perfect present to elevate any space.
          </p>

          <p className="guide-desc extra-text">
            Explore the full range and find the perfect present to elevate any
            space, whether you're gifting a loved one or treating yourself.
          </p>

          <button className="shop-btn">EXPLORE TODAY</button>
        </div>
      </div>
    </section>
  );
};

export default GiftGuideSection;
