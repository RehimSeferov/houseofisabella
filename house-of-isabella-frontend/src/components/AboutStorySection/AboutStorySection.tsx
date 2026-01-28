import React from "react";
import "./AboutStorySection.scss";


const storyImage =
  "https://houseofisabella.co.uk/cdn/shop/files/living_view_2_HD.jpg?v=1738615612&width=720";

const AboutStorySection: React.FC = () => {
  return (
    <section className="about-story-section">

      <div className="text-column">
        <div className="text-content-wrapper">
          <h4 className="story-title">HOUSE OF ISABELLA</h4>

          <div className="story-text">
            <p>
              Founded in 2010 by husband-and-wife duo Richard and Stephanie,
              House of Isabella was born from a shared passion for design. Their
              vision was to curate an exclusive collection of homewares from
              around the globe, offering distinctive pieces that help create
              beautiful, unique spaces.
            </p>
            <p>
              Now with headquarters in both the UK and Australia, House of
              Isabella has grown into a trusted name, known for exceptional
              style, quality and craftsmanship. Our carefully selected ranges
              allow anyone to achieve a designer look in their home, with
              timeless pieces that elevate every interior.
            </p>
            <p>
              We invite you to explore our collections and discover homewares
              that will make your space truly exceptional.
            </p>
          </div>
        </div>
      </div>

      <div className="image-column">
        <img
          src={storyImage}
          alt="House of Isabella Interior"
          className="story-image"
        />
      </div>
    </section>
  );
};

export default AboutStorySection;
