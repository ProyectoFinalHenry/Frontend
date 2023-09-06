import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductCart, getProductoDelete } from "../../store/reducers/thunk";
import axios from "axios";
import { getCantidadGasto } from "../../store/reducers/shopping/shopping";
import Swal from "sweetalert2";
import {getUserData} from '../../store/reducers/user/userSlice';


const Cart = ({ product, setCambio, cambio,FormatearCantidad}) => {
  const { image, name, price, stock, quantity, id } = product;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(quantity);
  const [spiner, setSpiner] = useState(false);
  const [deleteCart, setDeleteCart] = useState(false);

  // código baneo
  const user = useSelector((state) => state.user.user); 
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  

  useEffect(() => {
    console.log("entro al cambiio");
    const handleUpdateAmount = async () => {
      if (amount !== quantity) {
        try {
          let token = localStorage.getItem("tokens");
          const config = {
            headers: {
              auth_token: token,
            },
          };
          const response = await axios.post(
            `/cart/add/`,
            { coffeeId: id, quantity: amount },
            config
          );
          dispatch(getProductCart(token));
          setTimeout(() => {
            dispatch(getCantidadGasto());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleUpdateAmount();
  }, [amount]);

  useEffect(() => {
    if (spiner) {
      setTimeout(() => {
        setSpiner(false);
      }, 1000);
    }
  }, [spiner]);

  const handleDelete = () => {
    let token = localStorage.getItem("tokens");
    dispatch(getProductoDelete(id, token));
    setTimeout(() => {
      setCambio(!cambio);
    }, 1000);
    setDeleteCart(true);
  };

  const handleAmount = () => {
    if(user.isActive === false){
      return Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción, tu cuenta ha sido baneada",
        showConfirmButton: false,
        timer: 4000,
      });
    }

    if (amount > 1) {
      setSpiner(true);
      setTimeout(() => {
        setAmount(amount - 1);
        // setCambioTotal(!cambioTotal);
      }, 1000);
    }
  };

  const handleAmountMore = () => {
    if(user.isActive === false){
      return Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción, tu cuenta ha sido baneada",
        showConfirmButton: false,
        timer: 4000,
      });
    }

    if (amount < stock) {
      setSpiner(true);
      setTimeout(() => {
        setAmount(amount + 1); // Aumenta 1 al amount
        // setCambioTotal(!cambioTotal);
      }, 1000);
    }
  };

  return (
    <div className="cart">
      <div className="cart__Container">
        {deleteCart ? (
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <img className="cart__image" src={image} alt={image.name} />

            <div className="cart__description">
              <p>{name}</p>
              <div className="cart__configuracion">
                <span
                  onClick={handleDelete}
                  className="cart__configuracion--span"
                >
                  Eliminar
                </span>
              </div>
            </div>

            <div className="cart__stock">
              <div className="cart__quanitity">
                <div className="cart__align">
                  <button
                    className={
                      spiner ? "cart__controladorSpiner" : "cart__controlador"
                    }
                    onClick={handleAmount}
                  >
                    -
                  </button>
                  {spiner && (
                    <div class="lds-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  )}
                  <input className="cart__input" type="text" value={amount} />

                  <button
                    className={
                      spiner ? "cart__controladorSpiner" : "cart__controlador"
                    }
                    onClick={handleAmountMore}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="cart__configuracion--span">
                {stock} <span>disponibles</span>
              </p>
            </div>

            <div className="cart__total">
              <p>{FormatearCantidad(Number(price))}</p>
            </div>
          </>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Cart;
