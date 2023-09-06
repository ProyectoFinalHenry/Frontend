import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LandingCarousel from '../../components/LandingCarousel/LandingCarousel';
import Spinner from '../../components/Spinner/Spinner';
import './LandingPage.css'

const LandingPage = () => {

    const [product, setProducts] = useState([]);

    async function getProducts() {
        const { data } = await axios.get("coffee/")
        setProducts(data)
    }
    useEffect(() => {
        getProducts()
    }, [])

    const topSoldProducts = product.slice(0, 8);

    return (
        <div className="landing-page">
            <div className='landin-video-cont'>
                <video id="hero-video" className="hero-video" playsInline loop muted autoPlay>
                    <source src="https://cdn.shopify.com/s/files/1/1786/7381/files/hero-new.mp4?93" type="video/mp4" />
                </video>
            </div>

            <div className="landin-message-main">
                <p>SABORES DE TODO EL MUNDO A UN CLICK DE DISTANCIA...</p>
                <Link to="/products">COMPRAR CAFÉ</Link>
            </div>

            <div className='ladin-p1-cont'>
                <h1>Nuestros Productos Más Vendidos</h1>
                {
                    (!topSoldProducts.length) ?
                        (
                            <div className='landding-spinner-cont'>
                                <Spinner />
                            </div>
                        ) :
                        (<LandingCarousel topSoldProducts={topSoldProducts} />)
                }

            </div>

        </div>
    );
};

export default LandingPage;
