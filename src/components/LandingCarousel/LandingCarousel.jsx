import { useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './LandingCarousel.css'

const LandingCarousel = ({ topSoldProducts }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
  
    const slideItems = topSoldProducts.map((item, i) => (
        // Lógica para renderizar cada elemento del array
        <div className="slide-content">
            <img src={item.image} alt="stuff" width="320" height="240" />
            <div>
                <h3 className="slide-title"><bold>{item.name}</bold></h3>
                <p className="slide-text">{item.description}</p>
            </div>
                <a href="#" className="slide-link-button">Learn more</a>
        </div>
    ));
    return (
        <div className='carousel-cont'>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                //autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                //deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {slideItems}
            </Carousel>
        </div>
    )
};

export default LandingCarousel;