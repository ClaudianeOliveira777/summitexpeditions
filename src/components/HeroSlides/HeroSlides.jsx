import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroSlides.scss";


import ArrowLeft from "../../assets/img/arrowleft.svg";
import ArrowRight from "../../assets/img/arrowright.svg";

const slides = [
  { title: "MOUNT EVEREST", description: "Nepal, 8,848.86m / 29,032ft.", image: "/assets/img/Everest.avif"  },
  { title: "K2", description: "Pakistan, 8,611m / 28,251ft.", image: "/assets/img/K2.avif" },
  { title: "LHOTSE", description: "Nepal, 8,516m / 27,940ft.", image: "/assets/img/Lhotse.avif"  },
  { title: "MOUNT FUJI", description: "Japan, 3,776m / 12,389ft.", image: "/assets/img/Fuji.avif" },
  { title: "CHAMONIX", description: "France, 1,035m / 3,396ft.", image: "/assets/img/Chamonix.avif" }
];

const HeroSlides = () => {
  const sliderRef = useRef(null);
  
  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToNext = () => sliderRef.current?.slickNext();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    cssEase: 'linear'
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, i) => (
          <div key={i}>
            <div className="slide-content" style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="slide-caption">
                <h1 className="tour-title">{slide.title}</h1>
                <p className="tour-description">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      <button className="arrow-btn hero-prev" onClick={goToPrev}>
        <img src={ArrowLeft} alt="Previous" />
      </button>
      
      <button className="arrow-btn hero-next" onClick={goToNext}>
        <img src={ArrowRight} alt="Next" />
      </button>
    </div>
  );
};

export default HeroSlides;