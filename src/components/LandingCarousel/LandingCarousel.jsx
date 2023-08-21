import { useState } from 'react';
import './LandingCarousel.css'

const LandingCarousel = ({ topSold }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = event => {
        setIsChecked(event.target.checked);
    };

    const toggles = topSold.map((item, i) => (
        // Lógica para renderizar cada elemento del array
        <input
            type="radio"
            name="toggle"
            id={'btn-' + (i + 1)}
            key={(i + 1)}
            onChange={handleCheckboxChange}
            checked={(i === 0) ? true : isChecked}
        />
    ));
    const labels = topSold.map((item, i) => (
        // Lógica para renderizar cada elemento del array
        <label htmlFor={'btn-' + (i + 1)} key={(i + 1)}></label>
    ));

    const slides = topSold.map((item, i) => (
        // Lógica para renderizar cada elemento del array
        <li className="slide">
            <div className="slide-content">
                <h2 className="slide-title">{item.name}</h2>
                <p className="slide-text">{item.description}</p>
                <a href="#" className="slide-link">Learn more</a>
            </div>
            <p className="slide-image">
                <img src={item.image} alt="stuff" width="320" height="240" />
            </p>
        </li>
    ));
    return (
        <div>
            <div className="slider">
                {
                    toggles
                }
                <div className="slider-controls">
                    {
                        labels
                    }
                </div>
                <ul className="slides">
                    {slides}
                </ul>
            </div>
        </div>
    )
};

export default LandingCarousel;