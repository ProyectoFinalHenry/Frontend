import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-cont">
            <div className="footer-social-icons">
                <Link to="/" className="footer-icon">
                    <FaFacebook />
                </Link>
                <Link to="/" className="footer-icon">
                    <FaTwitter />
                </Link>
                <Link to="/" className="footer-icon">
                    <FaInstagram />
                </Link>
            </div>
            <p>© 2023 Grano de Oro, Inc.</p>
        </div>
    );
};

export default Footer;
