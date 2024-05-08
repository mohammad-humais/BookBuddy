import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper";
import { Api } from "../../utils/Api";
import { recentlyAddedProducts } from "../../utils/Endpoint";
import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import commonContext from "../../contexts/common/commonContext";
const FeaturedSlider = () => {
  const { setProductID } = useContext(commonContext);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const recentlyAddedProduct = async () => {
    const { statusCode, data } = await Api.getRecentlyAddedProducts(
      recentlyAddedProducts,
      {}
    );
    if (statusCode === true) {
      setRecentlyAdded(data);
    }
  };
  useEffect(() => {
    recentlyAddedProduct();
  }, []);

  const handleImageClick = (productID) => {
    setProductID(productID);
  };

  return (
    <Swiper
    modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
    loop={true}
    speed={400}
    // spaceBetween={100}
    // slidesPerView={"auto"}
    pagination={{ clickable: true }}
    effect={"coverflow"}
    centeredSlides={true}
    coverflowEffect={{
      rotate: 0,
      stretch: 0,
      depth: 70,
      modifier: 3,
      slideShadows: false,
    }}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      768: {
        slidesPerView: 2,
        spaceBetween: 200,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 250,
      },
    }}
      className="featured_swiper"
    >
  
      {recentlyAdded.length > 0 &&
        recentlyAdded.map((item) => {
          const { image, title, price } = item;
          const productID = item._id;

          return (
            <SwiperSlide className="featured_slides">
              <div className="featured_title">{title}</div>
              <figure
                className="featured_img"
                onClick={() => handleImageClick(productID)}
              >
                <Link to={`/product-details/${productID}`}>
                  <img src={image[0]} alt="" />
                </Link>
              </figure>
              <h2 className="products_price">
                {price} &nbsp;
                <small>
                  <del>{Number(price) + 100}</del>
                </small>
              </h2>
            </SwiperSlide>
          );
        })}
    
    </Swiper>
  );
};

export default FeaturedSlider;
