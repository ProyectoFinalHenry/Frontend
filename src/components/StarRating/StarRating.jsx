import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import './StarRating.css'
const StarRating = ({ onRatingChange,isFormVisible }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (value) => {
    if(!isFormVisible){
    setRating(value);
    onRatingChange(value)}
    else {
        setRating(0);
        onRatingChange(0);
        console.log('rating',rating)
    } 
  };
  const colorStar = '#FFD700';
  return (
    <div className='starRating-container'>
      {[1, 2, 3, 4, 5].map(value =>(
            <AiFillStar
            key={value}
            size={40}
            className={value <= (hoverRating || rating) ? 'selected-star' : 'unselected-star'}
            onMouseOver={() => handleMouseOver(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
            style={{ cursor: 'pointer' }}
                />
            )
            )
        }
    </div>
  );
};

export default StarRating;
