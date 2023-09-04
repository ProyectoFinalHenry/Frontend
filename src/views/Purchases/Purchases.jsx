import React, { useEffect,useState} from "react";
import './Purchases.css'
import axios from "axios"
import { Link } from 'react-router-dom';
const Purchases = () => {
    const token = localStorage.getItem("tokens")
    const [orders, setOrders] = useState([]);
    console.log('jtoa',token)
    useEffect(() => {
        const axiosData = async () => {
            try {
                if (token) {
                    const response = await axios.get("/user", { headers: { auth_token: token } });
                    setOrders(response.data.Orders);
                }
            } catch (error) {
                console.log(error);
            }
        };
  {console.log(orders)}
        axiosData();
    }, []);

    if (!token) return (
        <div></div>
    )
    return (
        <div className="purchases-create-container">
            <div className="purchases-banner">
                <p className='purchases-banner-msj'>MIS COMPRAS</p>
                <img className='purchases-create-image-banner' src="assets/images/bannere-home.webp" alt="banner" />
            </div>

            <div>
                {orders.length === 0 ? (
                    <div className="purchases">
                        <div className="purchases-header">
                            <div className="purchases-header-content">
                                <div className="purchases-header-title">
                                    <h1>!Todavia no has comprado nada!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="purchases">
                            <div className="purchases-header">
                                <div className="purchases-header-content">
                                    <div className="purchases-header-items">
                                        <h1>Compras</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {orders.map((order) => (
                            <div className="purchases" key={order.id}>
                                <div className="purchases-header">
                                    <div className="purchases-header-content">
                                        <div className="purchases-header-items">
                                            <h4>Fecha</h4>
                                            <h3>{order.date}</h3>
                                        </div>
                                        <div className="purchases-header-items">
                                            <h4>Precio total</h4>
                                            <h3>{order.totalPrice}</h3>
                                        </div>
                                        <div className="purchases-header-items">
                                            <h4>Estado</h4>
                                            <h3>{order.status}</h3>
                                        </div>
                                    </div>
                                </div>
                                {order.Details.map((product) => (
                                    <div key={product.Coffee.id}>
                                        {product.status === 'Approved' && <></>}
                                        
                                        <Link to={`/detail/${product.Coffee.id}`} key={product.Coffee.id}>
                                            <div className="purchases-product-container">
                                                <div className="purchases-img">
                                                    <img src={product.Coffee.image} alt="imagen producto" />
                                                </div>
                                                <div className="purchases-product-data">
                                                    <p>{product.Coffee.name}</p>
                                                    <span>$ {product.unitPrice} c/u</span>
                                                    <p>{product.quantity} unidades</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Purchases;
