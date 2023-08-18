import React from 'react';
import { Link } from 'react-router-dom'; 
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className='landin-video-cont'>
                <video id="hero-video" className="hero-video" playsInline loop muted autoPlay>
                    <source src="https://cdn.shopify.com/s/files/1/1786/7381/files/hero-new.mp4?93" type="video/mp4" />
                </video>
            </div>

                <div className="landin-message-main">
                    <p>SABORES DE TODO EL MUNDO A UN CLICK DE DISTANCIA...</p>
                    <Link to="/productos">COMPRAR CAFÉ</Link>
                </div>

            <div className='ladin-p1-cont'>
            <p className='landin-p1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fuga blanditiis laboriosam suscipit </p>
            </div>

        </div>
    );
};

export default LandingPage;
