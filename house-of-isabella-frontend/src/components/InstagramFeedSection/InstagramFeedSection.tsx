import React, { useRef } from "react";
import "./InstagramFeedSection.scss";

const instaImages = [
  // 1-6
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1576021182211-9ea8dced3690?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop",
  },

  // 7-12
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=600&auto=format&fit=crop",
  },

  {
    id: 13,
    url: "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 15,
    url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 16,
    url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 17,
    url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 18,
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
  },
];

const InstagramFeedSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);


  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth;

      if (direction === "left") {
        if (scrollLeft === 0) {
          sliderRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
   
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {

          sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <section className="instagram-feed-section">
      <h3 className="insta-title">@HOUSEOFISABELLAUK</h3>

      <div className="slider-wrapper">
        <button className="nav-btn prev" onClick={() => scroll("left")}>
          ‹
        </button>

        <div className="insta-grid" ref={sliderRef}>
          {instaImages.map((img) => (
            <div key={img.id} className="insta-item">
              <img src={img.url} alt="Instagram Post" className="insta-img" />
              <div className="overlay">
                <i className="instagram-icon"></i>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn next" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
};

export default InstagramFeedSection;
