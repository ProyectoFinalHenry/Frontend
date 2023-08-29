import React, { useEffect } from "react";
import "./Cart.css";

const Cart = ({ product, productsAddme, setProductsAddme }) => {
  const { image, name, price, stock, quantity } = product;
  
  return (
    <div className="cart">
      <div className="cart__Container">
        <img className="cart__image" src={image} alt={image.name} />

        <div className="cart__description">
          <p>{name}</p>
          <div className="cart__configuracion">
            <span className="cart__configuracion--span">Eliminar</span>
            <span className="cart__configuracion--span">Guardar</span>
            <span className="cart__configuracion--span">Comprar ahora</span>
          </div>
        </div>

        <div className="cart__stock">
          <div className="cart__quanitity">
            <button className="cart__controlador">-</button>
            <input className="cart__input" type="text" value={quantity} />

            <button className="cart__controlador">+</button>
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
