import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from '../../components/Spinner/Spinner'
import Reviews  from "../../components/Reviews/Reviews";
import NewReview from "../../components/NewReview/NewReview";
import "./Detail.css";
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { getProductAdd, getProductCart } from "../../store/reducers/thunk";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Detail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();
  const { id } = params;
  const [coffee, setCoffee] = useState([]);
  const [quantity, setQuantity] = useState(1); 

  const [user, setUser] = useState([]);
  const token = localStorage.getItem("tokens")
  console.log(token)
  useEffect(() => {
    async function getCoffeeData() {
      const { data } = await axios.get(`coffee/${id}`);
      setCoffee(data);
    }
    getCoffeeData();

    
    async function getUserData () {
      try {
          if (token) {
              const response = await axios.get("/user", { headers: { auth_token: token } });
              setUser(response.data);
          }
      } catch (error) {
          console.log(error);
      }
    
    };
    getUserData();
    
  }, [id]);

  const handleShopping = () =>{
    const ProdutAdd = {
      coffeeId:id,
      quantity:quantity
    }
    dispatch(getProductAdd(token ,ProdutAdd))
    if(!token){
      navigate('/auth/sing-in')
    }
  }
  // Funciones para manejar el aumento y la disminución de la cantidad
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const comprado=false
  // orders.forEach(order=>{
  //   order.forEach(product=>{
  //     if(product.status==='Appoved'){
  //       if(product.Coffee.id===id) {
  //         comprado=true
  //       }
  //     }
  //   })
  // })
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  if(coffee.length<1) return(
    <div className="detail-spinner-container">
      <Spinner />
    </div>
  )
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
              <form action="">
              </form>
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

            <button onClick={handleShopping} className="detail-add-product-btn"> <BsCart2 className="detail-cart-icon"/> ADD TO CART</button>
          </div>

          <p className="detail-product-description">{coffee?.description}</p>
          {/* <span className="stock">{coffee?.stock} units</span> */}

          <ul className="detail-container-card-info-ul">
            <li>
              <strong className="type">Tipo de Café: </strong>{" "}
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
      {(true)&&(
        <div className="detail-card-customer-reviews">
        <NewReview coffeeId={id} name={user.name} image={user.image}/>
      </div>
      )}
      <div className="detail-card-customer-reviews">
        <Reviews reviews={coffee.Reviews}/>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Detail;
