import React from 'react';
import { Link } from 'react-router-dom'; 
import './NavBar.css'

const NavBar = () => {
    return (
        <div className="navbar-container">
          <div className='navbar-logo'>
            <img src="assets/images/logo-3-white.png" alt="logo" />
          </div>
          <div className='navbar-links'>
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/carrito">Carrito</Link>
            </div>
        </div>
    );
};

export default NavBar;
