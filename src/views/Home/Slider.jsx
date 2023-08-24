import React, { useState, useEffect } from 'react';
import './Slider.css'; // Importa tu archivo CSS

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Definir una función para cambiar la clase de las imágenes
  const changeImageClass = () => {
    const imageElements = document.querySelectorAll('.slider-img');
    imageElements.forEach((image, index) => {
      if (index === currentIndex) {
        image.classList.remove('hidden');
        image.classList.add('isActive');
      } else {
        image.classList.remove('isActive');
        image.classList.add('hidden');
      }
    });

    // Avanzar al siguiente slide
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Iniciar el intervalo para cambiar las clases cada 3 segundos
  useInterval(() => {
    changeImageClass();
  }, 7000);

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`slider-img ${index === 0 ? 'isActive' : 'hidden'}`} // La primera imagen inicia con isActive
        />
      ))}
    </div>
  );
};

export default Slider;


/* 
PARA USARLO:
    - importarlo a cualquier componente y pasarle un array con rutas o URLs de imágenes
  const images = [
    '/assets/images/about-banner-1.png',
    '/assets/images/about-banner-2.png',
    '/assets/images/about-banner-3.png',
  ];


  <Slideshow images={images} />
*/