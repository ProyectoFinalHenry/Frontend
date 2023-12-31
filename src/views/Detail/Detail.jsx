import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import Reviews from "../../components/Reviews/Reviews";
import NewReview from "../../components/NewReview/NewReview";
import "./Detail.css";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { getProductAdd, getProductCart } from "../../store/reducers/thunk";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserData as getUserDataBan } from "../../store/reducers/user/userSlice";
import Swal from "sweetalert2";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [coffee, setCoffee] = useState([]);
  const [comprado, setComprado] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("tokens");

  async function getUserData() {
    try {
      if (token) {
        const response = await axios.get("/user", {
          headers: { auth_token: token },
        });
        setUser(response.data);

        response.data.Orders.forEach((order) => {
          order.Details.forEach((product) => {
            if (product.Coffee.id === id) {
              setComprado(true);
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getCoffeeData() {
    const { data } = await axios.get(`coffee/${id}`);
    setCoffee(data);
  }
  useEffect(() => {
    getCoffeeData();
    getUserData();
  }, [id]);

  // código baneo
  const userBan = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getUserDataBan());
  }, [dispatch]);

  const handleShopping = () => {
    //ALERTA SI EL USER ESTÁ BANEADO
    if (userBan.isActive === false) {
      return Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción, tu cuenta ha sido baneada",
        showConfirmButton: false,
        timer: 4000,
      });
    }

    //ALERTA SI EL USER NO ESTÁ VERIFICADO
    if (userBan.validated === false) {
      return Swal.fire({
        icon: "error",
        title:
          "No puedes realizar esta acción, tu cuenta no ha sido verificada aún",
        showConfirmButton: false,
        timer: 4000,
      });
    }

    //ALERTA SI EL PRODUCTO ESTÁ COMPRADO
    if (comprado === true) {
      return Swal.fire({
        icon: "error",
        title:
          "No puedes realizar esta acción, el producto ya ha sido comprado",
        showConfirmButton: false,
        timer: 4000,
      });
    }

    //ALERTA SI EL PRODUCTO NO EXISTE

    const ProdutAdd = {
      coffeeId: id,
      quantity: quantity,
    };
    dispatch(getProductAdd(token, ProdutAdd));
    if (!token) {
      navigate("/auth/sing-in");
    }
  };
  const increaseQuantity = () => {
    if (quantity < coffee.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  if (coffee.length < 1)
    return (
      <div className="detail-spinner-container">
        <Spinner />
      </div>
    );
  return (
    <div className="detail-container">
      <div className="detail-container-card">
        <div className="detail-contaner-card-img">
          <img
            className="detail-product-img"
            src={coffee?.image}
            alt={coffee?.name}
          />
        </div>

        <div className="detail-container-card-info">
          <h1 className="detail-product-name">{coffee?.name}</h1>
          <span className="detail-product-price">$ {coffee?.price}</span>

          {token ? (
            <div className="detail-add-product">
              <div className="detail-add-product-amount">
                <span className="detail-minus-btn" onClick={decreaseQuantity}>
                  <AiOutlineMinus />
                </span>
                <form action=""></form>
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

              <button
                onClick={handleShopping}
                className="detail-add-product-btn"
              >
                {" "}
                <BsCart2 className="detail-cart-icon" /> AGREGAR AL CARRITO
              </button>
            </div>
          ) : null}

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
      {comprado && (
        <div className="detail-card-customer-reviews">
          <NewReview
            coffeeId={id}
            name={user.name}
            image={user.image}
            getCoffeeData={getCoffeeData}
          />
        </div>
      )}
      <div className="detail-card-customer-reviews">
        <Reviews reviews={coffee.Reviews} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Detail;
