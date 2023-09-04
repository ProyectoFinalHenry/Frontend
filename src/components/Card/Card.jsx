import React from 'react';
import './Card.css';
import Stars from '../../components/Stars/Stars';
const Card = ({ id, image, title, reviews, price, stock }) => {
  
  const minStock = 5;

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
  
  let totalReviews=0
  reviews.forEach(review=>{totalReviews=totalReviews+review.rating})
  let promedioStar=0
  if(reviews.length>0) {promedioStar=Math.round((totalReviews / reviews.length) * 10) / 10
}
  return (
    <div className="Card-container">
        <div className="card-img-cont">
          {stock < minStock ? <span className="card-stock">{stock < minStock? `Ultimas ${stock} ud.` : null}</span> : null}
            <img src={image} alt="imagen producto" />
        </div>
        <div className="card-data-cont">
          <p>{title}</p>
          <div className="star-icons">
            <Stars stars={promedioStar}/>
          </div>
          {/* <span>{reviews}</span> */}
          <span>{formattedPrice}</span>
        </div>
    </div>
  );
};

export default Card;
