import React from "react";
import "./AboutVideoSection.scss";


const videoUrl =
  "https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4";

const AboutVideoSection: React.FC = () => {
  return (
    <section className="about-video-section">

      <div className="video-background">
        <video autoPlay loop muted playsInline className="video-element">
          <source src={videoUrl} type="video/mp4" />
        </video>
   
        <div className="video-overlay"></div>
      </div>


      <div className="content-container">
        <button className="view-more-btn">VIEW MORE</button>
      </div>
    </section>
  );
};

export default AboutVideoSection;
