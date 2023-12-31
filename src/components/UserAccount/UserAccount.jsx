import React, { useEffect, useRef } from "react";
import "./UserAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteToken, getLogOut } from "../../store/reducers/Login";
import logOut from "../../functions/logOut";
import { useNavigate } from "react-router-dom";
import { informationUser } from "../../store/reducers/thunk";
import Swal from "sweetalert2";
import { deleteCart } from "../../store/reducers/shopping/shopping";

const UserAccount = ({ setAccount }) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { NewinformationUser } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const handleClick = () => {
    Swal.fire({
      position: "center",
      text: "Estas seguro que quieres cerrar Sesion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si cerrar",
      confirmButtonColor: "#00F",
      cancelButtonText: "No cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Adios", "Esperamos verte aqui", "success");
        setTimeout(() => {
          logOut();
          dispatch(getLogOut());
          dispatch(deleteCart());
          dispatch(getDeleteToken());
          setAccount(false);
          localStorage.removeItem("tokens");
          navigate("/");
        }, 1000);
      }
    });
  };

  const token = localStorage.getItem("tokens");

  useEffect(() => {
    dispatch(informationUser(token));
    //para cerrar ventana con cualquier click de la pantalla:
    const closeAccountDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccount(false);
      }
    };

    document.addEventListener("mousedown", closeAccountDropdown);

    return () => {
      document.removeEventListener("mousedown", closeAccountDropdown);
    };
  }, []);

  return (
    <div className="account" ref={dropdownRef}>
      {Object.keys(NewinformationUser).length ? (
        <div>
          <div className="account__User">
            <img
              className="account__image"
              src={NewinformationUser.image}
              alt=""
            />
            <div>
              <p>Hola {NewinformationUser.name}</p>
            </div>
          </div>
          <div className="account__dateUser">
            <p onClick={() => navigate("/user/account")}>Cuenta</p>
            <p onClick={() => navigate("/purchases")}>Mis compras</p>
            <p id="log_out" onClick={handleClick} className="account__logOut">
              Cerrar sesion
            </p>
          </div>
        </div>
      ) : (
        <div id="loader">
          <span class="loader"></span>
        </div>
      )}
    </div>
  );
};

export default UserAccount;
