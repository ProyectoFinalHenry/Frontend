import React, { useState, useEffect } from 'react';
import { RiArrowUpDoubleFill } from 'react-icons/ri';
import './ScrollToTopButton.css'; 



const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Verifica si el usuario ha desplazado la página una cierta cantidad hacia abajo
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Desplaza la página al principio
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Opción para hacer el desplazamiento suave
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <RiArrowUpDoubleFill />
    </button>
  );
};



export default ScrollToTopButton;
