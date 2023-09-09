import { useEffect, useState } from "react";
import "./ShoppingCard.css";
import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import axios from "axios";
import { getProductCart } from "../../store/reducers/thunk";
import { getCantidadGasto } from "../../store/reducers/shopping/shopping";
import EmptyCart from "../EmptyCart/EmptyCart";
import Swal from "sweetalert2";
import {getUserData} from '../../store/reducers/user/userSlice';



const ShoppingCart = () => {

  const [productsAddme, setProductsAddme] = useState(0);
  const [cambio, setCambio] = useState(false);
  const [cambioTotal, setCambioTotal] = useState(false);
  const { cart, total } = useSelector((state) => state.shopping);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // código baneo
  const user = useSelector((state) => state.user.user); 
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);



  useEffect(() => {
    const token1 = localStorage.getItem("tokens");
    dispatch(getProductCart(token1));
    setTimeout(() => {
      dispatch(getCantidadGasto());
    }, 1000);
  }, [cambioTotal]);

  console.log(cart);
  const FormatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleClick = async () => {
     //ALERTA SI EL USER NO ESTÁ VERIFICADO
     if(user.validated === false){
      Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción, tu cuenta no ha sido verificada aún",
        showConfirmButton: false,
        timer: 4000,
      });
      return setTimeout(() => {
        navigate("/send/validation")
      }, 4000)
    }
    
    if(user.isActive === false){
     return Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción, tu cuenta ha sido baneada",
        showConfirmButton: false,
        timer: 4000,
      });

    }
    if(user.address === null){
      Swal.fire({
        icon: "error",
        title: "No puedes realizar esta acción, debes agregar una dirección de envío",
        showConfirmButton: false,
        timer: 4000,
      });
      return setTimeout(() => {
        navigate("/user/address");
      },3000)
    }


    const token = localStorage.getItem("tokens");
    const config = {
      headers: {
        auth_token: token,
      },
    };

    try {
      const { data } = await axios.get("/payment/createOrder", config);
      if (data) {
        window.location.href = data.body.init_point;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    dispatch(getProductCart(token));
    setTimeout(() => {
      dispatch(getCantidadGasto());
    }, 1000);
  }, [cambio]);

  return (
    <div className="shoppingCart">
      <div className="shoppingCard__container">
        <div className="shopping__Productos">
          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <h3 className="shopping__subtitulo">Productos</h3>
              <hr />
              <div className="shooping__Canasta">
                {cart.map((product) => (
                  <Cart
                    key={product.id}
                    product={product}
                    productsAddme={productsAddme}
                    cambio={cambio}
                    setCambio={setCambio}
                    FormatearCantidad={FormatearCantidad}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="shopping__Pago">
          <h4
            className={
              cart.length === 0 ? "shoping__compraVacia" : "shopping__compra"
            }
          >
            Resumen de Compra
          </h4>
          <hr />
          {cart.length === 0 ? (
            <div className="shopping__cartVacio">
              <p>
                Aquí verás los importes de tu compra una vez que agregues
                productos.
              </p>
            </div>
          ) : (
            <div className="shopping__table">
              <div>
                <p className="shopping__contenidos">
                  Productos <span>({cart.length})</span>
                </p>
                <p className="shopping__contenidos">Envio</p>
                <p className="shopping__contenidos">Total</p>
              </div>
              <div>
                <p className="shoppong__quantity">{FormatearCantidad(total)}</p>
                <p className="shopping__Free">Gratis</p>
                <p>{FormatearCantidad(total)}</p>
              </div>
            </div>
          )}
          {cart.length === 0 ? (
            ""
          ) : (
            <button className="shopping__envio" onClick={handleClick}>
              Continuar Compra
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
