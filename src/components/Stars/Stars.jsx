import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import './Stars.css';

const Stars = ({ stars }) => {
  // Asegurémonos de que 'stars' esté en el rango de 0 a 5
  const validStars = Math.min(Math.max(stars, 0), 5);

  // Crear un array con AiFillStar o AiOutlineStar según el valor de 'stars'
  const starIcons = Array(5).fill('').map((_, index) => {
    if (index < validStars) {
      return <AiFillStar key={index} className="star-icon" />;
    } else {
      return <AiOutlineStar key={index} className="star-icon" />;
    }
  });

  return <div className="stars-container">{starIcons}</div>;
};

export default Stars;
