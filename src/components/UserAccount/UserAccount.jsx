import React from "react";
import "./UserAccount.css";
import { useDispatch } from "react-redux";
import { getLogOut,  } from "../../store/reducers/Login";
import logOut from "../../functions/logOut";
import {useNavigate} from "react-router-dom";

const UserAccount = ( {setAccount} ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClick = () =>{
    logOut()
    dispatch(getLogOut())
    setAccount(false)
  }
  return (
    <div className="account">
        <div className="account__User">
          <p style={{ color: "#FFF" }}>Hola Usuario</p>
          <p>ver mi perfil</p>
        </div>
        <div className="account__dateUser">
          <p>Cuenta</p>
          <p>Administrador</p>
          <p onClick={() => navigate('/create')}>Vender un Producto</p>
          <p 
          onClick={handleClick}
          className="account__logOut">Cerrar sesion</p>
        </div>
    </div>
  );
};

export default UserAccount;
