import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './NavBar.css'
import { PathsToNoFill } from '../../constants/NavbarPathToFill.constants';

const NavBar = () => {

const location = useLocation();

    return (
        <div className={"navbar-container " + (PathsToNoFill.includes(location.pathname) ? "" : "fill")}>
          <div className='navbar-logo'>
            <img src="/assets/images/logo-3-white.png" alt="logo" />
          </div>
          <div className='navbar-links'>
                <Link to="/">Inicio</Link>
                <Link to="/products/page/1">Productos</Link>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/carrito">Carrito</Link>
            </div>
        </div>
    );
};

export default NavBar;
