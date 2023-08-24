import React, { useState } from "react";
import { Link, useLocation ,useNavigate } from "react-router-dom";
import "./NavBar.css";
import { PathToFill } from "../../constants/NavbarPathToFill.constants";
import UserAccount from "../UserAccount/UserAccount";
import { AiOutlineDown ,AiOutlineUp ,AiOutlineShoppingCart} from "react-icons/ai";
import { useSelector } from "react-redux";
const NavBar = () => {
  const location = useLocation();
  const shouldFill = PathToFill.includes(location.pathname);
  const navigate = useNavigate()

  const { LoginAndLogOut } = useSelector((state) => state.login);

  const [account, setAccount] = useState(false);

  return (
    <div className={"navbar-container " + (shouldFill ? "fill" : "")}>
      <div className="navbar-logo">
        <img onClick={() => navigate('/') } src="/assets/images/logo-3-white.png" alt="logo" />
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/products/page/1">Productos</Link>
        <Link to="/about">Nosotros</Link>
        { LoginAndLogOut && <Link to="shoppingCart"><AiOutlineShoppingCart className="navbar--shopping"/></Link> }
        {LoginAndLogOut ? (
          <div className="navbar--container" onClick={() => setAccount(!account)}>
            <p  className="navbar--cuenta">
              Cuenta
            </p>
            {account? 
            <AiOutlineUp className="navbar--btn"/>
              :
            <AiOutlineDown className="navbar--btn" />
          }
          </div>
        ) : (
          <Link to="/auth/sing-in">Acceder</Link>
        )}
      </div>
      {account && <UserAccount setAccount={setAccount}  />}
    </div>
  );
};

export default NavBar;
