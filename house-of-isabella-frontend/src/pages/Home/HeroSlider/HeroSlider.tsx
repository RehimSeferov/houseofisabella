import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HeroSlider.scss";

const slides = [
  {
    id: 1,
    type: "video",
    src: "https://houseofisabella.co.uk/cdn/shop/videos/c/vp/904aa96ca568449298b2fcce24b2717e/904aa96ca568449298b2fcce24b2717e.HD-1080p-4.8Mbps-64211094.mp4?v=0``  ",
    subtitle: "THE WINTER COLLECTION",
    title: "Timeless Luxury",
    description:
      "Embrace the spirit of the season with interiors that celebrate the magic of winter.",
    buttonText: "EXPLORE COLLECTION",
    link: "/new",
    alignment: "center",
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    subtitle: "MODERN LIVING",
    title: "Tommy Franks Sale",
    description: "Up to 30% off selected luxury furniture lines.",
    buttonText: "SHOP THE SALE",
    link: "/sale",
    alignment: "center",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2000&auto=format&fit=crop",
    subtitle: "LIGHTING DESIGN",
    title: "Illuminate Your Space",
    description:
      "Premium lighting fixtures designed to create the perfect ambiance.",
    buttonText: "VIEW LIGHTING",
    link: "/lighting",
    alignment: "center",
  },
];

const HeroSlider = () => {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay blocked:", error);
      });
    }
  }, []);

  return (
    <section className="hero-slider">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect={"fade"}
        speed={1500}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-content">
              <div className="media-wrapper">
                {slide.type === "video" ? (
                  <video
                    ref={videoRef} 
                    className="bg-video"
                    autoPlay
                    loop
                    muted 
                    playsInline
                    preload="auto" 
                  >
                    <source src={slide.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${slide.src})` }}
                  />
                )}
              </div>

              <div className="overlay"></div>

              <div className={`text-wrapper ${slide.alignment}`}>
                <div className="text-box">
                  {slide.subtitle && (
                    <span className="subtitle">{slide.subtitle}</span>
                  )}
                  <h1 className="title">{slide.title}</h1>
                  <p className="description">{slide.description}</p>
                  <Link to={slide.link} className="hero-btn">
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
