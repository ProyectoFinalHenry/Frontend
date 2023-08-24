import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';


const Detail = () => {
  const params = useParams();
  const { id } = params;
  const [coffee, setCoffee] = useState([]);
  const [quantity, setQuantity] = useState(1); // Estado para el valor del input

  useEffect(() => {
    async function getCoffeeData() {
      const { data } = await axios.get(`coffee/${id}`);
      setCoffee(data);
    }
    getCoffeeData();
  }, [id]);

  // Funciones para manejar el aumento y la disminución de la cantidad
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="detail-container">
      <div className="detail-container-card">

        <div className="detail-contaner-card-img">
          <img className="detail-product-img"
            src={coffee?.image}
            alt={coffee?.name}
          />
        </div>

        <div className="detail-container-card-info">
          <h1 className="detail-product-name">{coffee?.name}</h1>
          <span className="detail-product-price">$ {coffee?.price}</span>


          <div className="detail-add-product">
            <div className="detail-add-product-amount">
              <span className="detail-minus-btn" onClick={decreaseQuantity}>
                < AiOutlineMinus />
              </span>
              <input
                className="detail-input-add-cart"
                type="text"
                value={quantity}
                readOnly
              />
              <span className="detail-plus-btn" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </div>
            <button className="detail-add-product-btn"> <BsCart2 className="detail-cart-icon"/> ADD TO CART</button>
          </div>

          <p className="detail-product-description">{coffee?.description}</p>
          {/* <span className="stock">{coffee?.stock} units</span> */}
          <ul class="detail-container-card-info-ul">
            <li>
              <strong class="type">Tipo de Café: </strong>{" "}
              {coffee?.TypeOfCoffee?.type}
            </li>
            <li>
              <strong>Origen: </strong> {coffee?.Origin?.origin}
            </li>
            <li>
              <strong>Tipo de tostado: </strong>{" "}
              {coffee?.RoastingProfile?.profile}
            </li>
          </ul>
        </div>
        
      </div>

      <div className="detail-card-customer-reviews">
        <h2 className="detail-card-customer-reviews-title">CUSTOMER REVIEWS</h2>
      </div>
    </div>
  );
};

export default Detail;
