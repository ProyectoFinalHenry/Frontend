import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './NavBar.css'
import { PathToFill } from '../../constants/NavbarPathToFill.constants';

const NavBar = () => {

  const location = useLocation();
  const shouldFill = PathToFill.includes(location.pathname);

  return (
    <div className={"navbar-container " + (shouldFill ? "fill" : "")}>
      <div className='navbar-logo'>
        <img src="/assets/images/logo-3-white.png" alt="logo" />
      </div>
      <div className='navbar-links'>
        <Link to="/">Inicio</Link>
        <Link to="/products/page/1">Productos</Link>
        <Link to="/about">Nosotros</Link>
       {/*  <Link to="/carrito">Carrito</Link> */}
        <Link to="/auth/sing-in">Acceder</Link>
        <Link to="/create">Agregar</Link>
      </div>
    </div>
  );
};

export default NavBar;