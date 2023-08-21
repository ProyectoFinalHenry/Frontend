import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Card.css';

const Card = ({ id, image, title, reviews, price, stock }) => {
  
  const minStock = 5;

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);

  return (
    <div className="Card-container">
        <div className="card-img-cont">
          {stock < minStock ? <span className="card-stock">{stock < minStock? `Ultimas ${stock} ud.` : null}</span> : null}
            <img src={image} alt="imagen producto" />
        </div>
        <div className="card-data-cont">
          <p>{title}</p>
          <div className="star-icons">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          {/* <span>{reviews}</span> */}
          <span>{formattedPrice}</span>
        </div>
    </div>
  );
};

export default Card;
