import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch } from "react-redux";
import { getProductoDelete } from "../../store/reducers/thunk";
import axios from "axios";

const Cart = ({ product, productsAddme, setProductsAddme }) => {
  const { image, name, price, stock, quantity , id} = product;
  const dispatch = useDispatch()
  console.log(product)
  const [amount , setAmount] = useState(quantity)


  useEffect(() => {
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
          console.log(response.data); // Aquí puedes realizar alguna acción con la respuesta de la petición
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleUpdateAmount();
  }, [amount])
  
  const handleDelete = () =>{
    let token = localStorage.getItem('tokens')
    dispatch(getProductoDelete(id , token))
  }

  const handleAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1); // Resta 1 al amount
    }
  };

  const handleAmountMore = () => {
    if (amount < stock) { // Verifica si amount es menor al stock
      setAmount(amount + 1); // Aumenta 1 al amount
    }
  };

  return (
    <div className="cart">
      <div className="cart__Container">
        <img className="cart__image" src={image} alt={image.name} />

        <div className="cart__description">
          <p>{name}</p>
          <div className="cart__configuracion">
            <span onClick={handleDelete} className="cart__configuracion--span">Eliminar</span>
          </div>
        </div>

        <div className="cart__stock">
          <div className="cart__quanitity">
            <button className="cart__controlador" onClick={handleAmount}>-</button>
            <input className="cart__input" type="text" value={amount} />

            <button className="cart__controlador" onClick={handleAmountMore}>+</button>
          </div>
          <p className="cart__configuracion--span">{stock} <span>disponibles</span></p>
        </div>

        <div className="cart__total">
          <span>{price}</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Cart;
