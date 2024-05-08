import React from "react";
import {  useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "./image1.jpg";
import img2 from "./image2.jpg";
import img3 from "./image3.jpg";
import img4 from "./image4.jpg";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "./HeroSlider.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const slides = [
  { image: img1, type: 'youtube' },
  { image: img2, type: 'facebook' },
  { image: img3, type: 'instagram' },
  { image: img4, type: 'tiktok' },
];

const HeroSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  return (
    <>
      <div className="slider-container">
        <div className="first-half1">
          <div className="first-half-content">
            <h2 className="main-heading">
              Book Buddy
            </h2>
            <small className="sub-heading">
              Digital Account Marketplace
            </small>
            <ul className="bullet-list">
              <li>
                {" "}
                <span style={{ color: "green", "margin-right": "5px" }}>
                  <BsFillCheckCircleFill />
                </span>{" "}
                100% verified Accounts
              </li>
              <li>
                {" "}
                <span style={{ color: "green", "margin-right": "5px" }}>
                  <BsFillCheckCircleFill />
                </span>{" "}
                Secure transactions
              </li>
              <li>
                {" "}
                <span style={{ color: "green", "margin-right": "5px" }}>
                  <BsFillCheckCircleFill />
                </span>{" "}
                Fast Delivery
              </li>
            </ul>

            <div className="heroSilder-buttons">
              <button type="submit" className="red-button">
                Know More
              </button>
              <button className="blue-button" onClick={""}>
                Join Now
              </button>
            </div>
          </div>
        </div>

         <div className="second-half ">
          <div className={`display-none myclass social-account-color ${slides[currentSlideIndex].type}`}>
            <div className="small-slider" style={{ marginLeft: "-50px" }}>
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay={true}
                autoPlaySpeed={5*1000}
                infiniteLoop={true}
                showArrows={false}
                stopOnHover={false}
							  transitionDuration={2000}
                onChange={slideIndex => setCurrentSlideIndex(slideIndex)}
              >
                {slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.image} alt="img" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div
              className="small-slider"
              style={{ marginLeft: "auto", marginRight: "-50px" }}
            >
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay={true}
                autoPlaySpeed={5*1000}
                infiniteLoop={true}
                showArrows={false}
                stopOnHover={false}
							  transitionDuration={2000}
              >
                {slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.image} alt="img" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="small-slider" style={{ marginLeft: "-50px" }}>
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay={true}
                autoPlaySpeed={5*1000}
                infiniteLoop={true}
                showArrows={false}
                stopOnHover={false}
							  transitionDuration={2000}
              >
                {slides.map((slide, index) => (
                  <div key={index}>
                    <img src={slide.image} alt="img" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div> 
      </div>
    </>
  );
};

export default HeroSlider;
