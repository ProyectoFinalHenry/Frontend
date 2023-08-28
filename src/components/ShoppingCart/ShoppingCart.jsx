import { useEffect, useState } from "react";
import "./ShoppingCard.css";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import axios from "axios";
const ShoppingCart = () => {
  const [productsAddme, setProductsAddme] = useState(0);
  const [total, setTotal] = useState(0);
  const { cart } = useSelector((state) => state.shopping);
  console.log(cart);

  useEffect(() => {
    const controlGastos = cart.reduce(
      (total, gasto) => (total + Number(gasto.price)) * gasto.quantity,
      0
    );
    setTotal(controlGastos);
  }, [cart]);
  const FormatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleClick = async () => {
    const registerToken = localStorage.getItem("tokenUser");
    const loginToken = localStorage.getItem("loginToken");
    const authToken = registerToken ? registerToken : loginToken;
    const config = {
      headers: {
        auth_token: authToken,
      },
    };

    try {
      const { data } = await axios.get("/payment/createOrder", config);
      if(data){
        window.location.href = data.body.init_point
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="shoppingCart">
      <div className="shoppingCard__container">
        <div className="shopping__Productos">
          <h3 className="shopping__subtitulo">Productos</h3>
          <hr />
          <div className="shooping__Canasta">
            {cart.map((product) => (
              <Cart
                key={product.id}
                product={product}
                productsAddme={productsAddme}
              />
            ))}
          </div>
        </div>
        <div className="shopping__Pago">
          <h4 className="shopping__compra">Resumen de Compra</h4>
          <hr />
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
          <button className="shopping__envio" onClick={handleClick}>
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
