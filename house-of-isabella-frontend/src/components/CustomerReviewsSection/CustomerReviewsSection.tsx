import React, { useRef } from "react";
import "./CustomerReviewsSection.scss";


const reviews = [
  {
    id: 1,
    author: "Sithokozile Masuku",
    title: "Good price",
    text: "Exceptional for the price. Really happy with the quality.",
    stars: 5,
  },
  {
    id: 2,
    author: "Jacque b",
    title: "Pleasantly surprised.",
    text: "Rarely do I find that items I order online look as good in person. This mirror met all expectations...",
    stars: 5,
  },
  {
    id: 3,
    author: "Lee C",
    title: "Great mirror, great service",
    text: "Love the mirror we got from yourselves, great service and it really finishes off the room.",
    stars: 5,
  },
  {
    id: 4,
    author: "Steven Tanner",
    title: "Solid and good quality",
    text: "Was pleased to have received what I had anticipated. Solid well made.",
    stars: 5,
  },
  {
    id: 5,
    author: "Lorraine Dunstan",
    title: "Excellent",
    text: "Amazing product speedy delivery great price and table is of high quality and unique.",
    stars: 5,
  },
  {
    id: 6,
    author: "Jenny D",
    title: "Beautiful light",
    text: "Although this is a bit tricky to put together. It was worth it. Lots of compliments.",
    stars: 5,
  },
  {
    id: 7,
    author: "Mike Kellard",
    title: "Great lamp",
    text: "Very nice lamp, sturdy and elegant. Fits perfectly in the living room.",
    stars: 5,
  },
  {
    id: 8,
    author: "Kanwal Jafri",
    title: "Stunning wall lights",
    text: "A very classy and high quality wall lights, perfect for my living room.",
    stars: 5,
  },
  {
    id: 9,
    author: "Eve Goncalves",
    title: "Great product",
    text: "Good delivery times. Really pleased all round.",
    stars: 5,
  },
  {
    id: 10,
    author: "Alison Hobbs",
    title: "Lovely quality statement",
    text: "Great quality item for the money - looks great even in a small space.",
    stars: 5,
  },
  {
    id: 11,
    author: "Girish",
    title: "Customer service was excellent",
    text: "Happy with the experience despite the initial hiccups. They resolved it quickly.",
    stars: 5,
  },
  {
    id: 12,
    author: "Kelly J",
    title: "Gorgeous",
    text: "This lamp is stunning, even better in real life - definitely worth waiting for.",
    stars: 5,
  },
];

const CustomerReviewsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const scrollAmount = 400;

      if (direction === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollLeft === 0) {
          sliderRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          sliderRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <section className="customer-reviews-section">
      <div className="reviews-header">
        <h2 className="section-title">LET CUSTOMERS SPEAK FOR US</h2>
        <div className="rating-summary">
          <span className="stars">★★★★★</span>
          <span className="review-count">from 1645 reviews</span>
        </div>
      </div>

      <div className="reviews-slider-container" ref={sliderRef}>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="card-stars">★★★★★</div>
            <h4 className="review-title">{review.title}</h4>
            <p className="review-text">{review.text}</p>
            <div className="review-author">{review.author}</div>
          </div>
        ))}
      </div>

      <div className="reviews-navigation">
        <button className="nav-btn prev" onClick={() => scroll("left")}>
          ‹
        </button>
        <button className="nav-btn next" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
