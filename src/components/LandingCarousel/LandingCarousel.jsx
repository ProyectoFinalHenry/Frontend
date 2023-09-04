import { FaStar } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
import Carousel from "react-multi-carousel";
import Stars from '../../components/Stars/Stars';
import "react-multi-carousel/lib/styles.css";
import './LandingCarousel.css'


const LandingCarousel = ({ topSoldProducts }) => {
    const navigate = useNavigate();
    let promedioStar=0
    let totalReviews=0
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

    const handleCoffeeDetail = (coffeeId) => {
        navigate(`detail/${coffeeId}`);
    }

    const slideItems = topSoldProducts.map((item, i) => {
        item.Reviews.forEach(review=>totalReviews=totalReviews+review.rating)
        if(item.Reviews.length>0) {promedioStar=Math.round((totalReviews / item.Reviews.length) * 10) / 10}
        return (<div className="slide-content" key={i}>
        <div
            className='slide-image-cont'
            onClick={() => handleCoffeeDetail(item.id)} >
            <img src={item.image} alt="stuff" width="320" height="240" />
        </div>
        <div>
            <h3 className="slide-title"><strong>{item.name}</strong></h3>
            <p className="slide-text">{item.description}</p>
        </div>
        <div className='slide-star-icons-cont'>
            <Stars stars={promedioStar}/>
        </div>
        </div>

    )});
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
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                transitionDuration={2000}
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