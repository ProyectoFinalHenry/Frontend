import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Card.css';

const Card = ({ id, image, title, reviews, price }) => {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);

  return (
    <div className="Card-container">
        <div className="card-img-cont">
            <img src={image} alt="imagen producto" />
        </div>
      <p>{title}</p>
      <span>{reviews}</span>
      <div className="star-icons">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <span>{formattedPrice}</span>
    </div>
  );
};

export default Card;
