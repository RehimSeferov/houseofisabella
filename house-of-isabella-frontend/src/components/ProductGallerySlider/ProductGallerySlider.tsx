import React from "react";
import "./ProductGallerySlider.scss";
const galleryData = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1594967389507-68b209d0d880?q=80&w=1974&auto=format&fit=crop",
  }, 
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1627448896000-84a86b9b3f3b?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1551221711-209212cc80e4?q=80&w=1974&auto=format&fit=crop",
  }, 
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1550992383-74d6e903d3c1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1617457782352-78d91a99859f?q=80&w=2070&auto=format&fit=crop",
  }, 
  {
    id: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1513224376450-8b1e06d99f92?q=80&w=1974&auto=format&fit=crop",
  }, 


  {
    id: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1582210878036-7c050d28f804?q=80&w=1968&auto=format&fit=crop",
  },
  {
    id: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1616047120612-259207e38209?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1582210878036-7c050d28f804?q=80&w=1968&auto=format&fit=crop",
  },
];

const ProductGallerySlider: React.FC = () => {
  return (
    <section className="gallery-slider-section">
   
      <div className="slider-wrapper">
 
        <div className="gallery-grid">
          {galleryData.map((item, index) => (
            <div key={item.id} className={`gallery-item item-${index + 1}`}>
              <img
                src={item.imageUrl}
                alt={`Gallery item ${item.id}`}
                className="gallery-image"
              />

              {index === 7 && (
                <div className="insta-overlay-static">
                  <span className="overlay-text">@INSTAGRAM</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      <div className="pagination-arrows">
        <button className="arrow-btn prev-btn">←</button>
        <button className="arrow-btn next-btn">→</button>
      </div>
    </section>
  );
};

export default ProductGallerySlider;
