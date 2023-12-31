import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { PathToFill } from "../../constants/NavbarPathToFill.constants";
import UserAccount from "../UserAccount/UserAccount";
import { AiOutlineDown, AiOutlineUp, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const NavBar = () => {
  const location = useLocation();
  const shouldFill = PathToFill.includes(location.pathname);

  // RUTAS CON LA NABVAR ESTILO WHITE
  let routeNavWhite = false;
  const regexReset = /^\/reset\/.*/;

  if (/^\/detail\/[0-9a-fA-F-]+$/.test(location.pathname)) routeNavWhite = true;
  if (location.pathname === '/user/account') routeNavWhite = true;
  if (location.pathname === '/user/address') routeNavWhite = true;
  if (location.pathname === '/user/info') routeNavWhite = true;
  if (location.pathname === "/shoppingCart") routeNavWhite = true;
  if (location.pathname === "/send/reset") routeNavWhite = true;
  if (location.pathname === "/send/validation") routeNavWhite = true;
  if (regexReset.test(location.pathname)) routeNavWhite = true;
  if(location.pathname === '/purchases') routeNavWhite = true;
  if(location.pathname === '/team') routeNavWhite = true;
  if (location.pathname === '/auth/sing-in') routeNavWhite = true;
  if(location.pathname === '/auth/sing-up') routeNavWhite = true;
 
  // CAMBIAMOS LA CLASE DE LA NABVAR SI LA RUTA USA NAVBAR WHITE
  const containerClass = routeNavWhite ? 'navbar-cont-white' : 'navbar-container';
  const logoClass = routeNavWhite ? 'navbar-logo' : 'navbar-logo';
  const linkClass = routeNavWhite ? 'navbar-white-link' : 'navbar-links text-shadow';
  const src = routeNavWhite ? '/assets/images/logo-2-back.png' : '/assets/images/logo-3-white.png';


  const [account, setAccount] = useState(false);
  const token = localStorage.getItem('tokens');

  useEffect(() => {
    
  },[location])



  return (
    <div className={`${containerClass} ${shouldFill ? "fill" : ""}`}>
      <div className={`${logoClass}`}>
        <img src={src} alt="logo" />
      </div>
      <div className={`${linkClass}`}>
        <Link to="/">Inicio</Link>
        <Link to="/products/page/1">Productos</Link>
        <Link to="/about">Nosotros</Link>
        {token && <Link to="shoppingCart">
          <AiOutlineShoppingCart className="navbar--shopping" />
        </Link>}
        {token ? (
          <div className="navbar--container" onClick={() => setAccount(!account)}>
            <p className="navbar--cuenta">
              Cuenta
            </p>
            {account ?
              <AiOutlineUp className="navbar--btn" />
              :
              <AiOutlineDown className="navbar--btn" />
            }
          </div>
        ) : (
          <Link to="/auth/sing-in">Acceder</Link>
        )}
      </div>
      {account && token ? <UserAccount setAccount={setAccount} /> : null}
    </div>
  );
};

export default NavBar;
