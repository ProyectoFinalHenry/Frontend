import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './NavBar.css'
import { PathToFill } from '../../constants/NavbarPathToFill.constants';
import { BsCart2 } from 'react-icons/bs';

const NavBar = () => {
  const location = useLocation();
  const shouldFill = PathToFill.includes(location.pathname);
  const isDetailRoute = /^\/detail\/[0-9a-fA-F-]+$/.test(location.pathname);

  const containerClass = isDetailRoute ? 'navbar-cont-white' : 'navbar-container';
  const logoClass = isDetailRoute ? 'navbar-logo' : 'navbar-logo'; 
  const linkClass = isDetailRoute ? 'navbar-white-link' : 'navbar-links text-shadow'; 

  const src = isDetailRoute ? '/assets/images/logo-2-back.png' : '/assets/images/logo-3-white.png';

  return (
    <div className={`${containerClass} ${shouldFill ? "fill" : ""}`}>
      <div className={`${logoClass}`}>
        <img src={src} alt="logo" />
      </div>
      <div className={`${linkClass}`}>
        <Link to="/">Inicio</Link>
        <Link to="/products/page/1">Productos</Link>
        <Link to="/about">Nosotros</Link>
        <Link to="/auth/form">Acceder</Link>
        <Link to="/cart"> <BsCart2 /> </Link> 
        {/* <Link to="/create">Agregar</Link> */}
      </div>
    </div>
  );
};

export default NavBar;
