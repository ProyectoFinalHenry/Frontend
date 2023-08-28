import axios from "axios";
import Swal from "sweetalert2";
import { getInformationUser, getTokenUser } from "./Login";
import { toast } from "react-toastify";
import { getCartProduct } from "./shopping/shopping";

export const informationUser = (user) => {
  return async (dispatch, getState) => {
    const authToken = user;

    const config = {
      headers: {
        auth_token: authToken,
      },
    };

    try {
      const {data} = await axios.get(`/user`, config);
      dispatch(getInformationUser(data))
    } catch (error) {
      console.log(error);
    }
  };
};
export const NewRegisterUser = (newUser) => {
  console.log(newUser)
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/user/signup",
        newUser
      );
      if (data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Correo Registrado correctamente",
          showConfirmButton: false,
          timer: 900,
        });
      }
      localStorage.setItem("tokenUser", data.auth_token);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        alert("Error con el servidor Ingrese mas tarde");
      }
      if (error.code === "ERR_BAD_RESPONSE") {
        alert("El Usuario ya existe");
      }
    }
  };
};

export const SingInUserLogin = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`/user/login`, userLogin);
      dispatch(getTokenUser(data));
      if (data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Bienvenido",
          showConfirmButton: false,
          timer: 900,
        });
      }
      localStorage.setItem("loginToken", data.auth_token);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Email o contraseña incorrecta",
          showConfirmButton: false,
          timer: 900,
        });
      }
    }
  };
};

// export const validation = (email) =>{
//   return async (dispatch, getState) =>{
//     const {data} = await axios.post('/user/send/validation',{email:email})
//     console.log(data)
//   }
// }
//informacion del carrito de compras

export const getProductAdd = (token,cantidad) =>{
  return async(dispatch, getState) =>{
    console.log(token)
    const config = {
      headers: {
        auth_token: token,
      },
    };
try {
  const {data} = await axios.post('/cart/add', cantidad ,config)
  console.log(data)
  if(data){
    toast(data.status,{
      position:'bottom-right',
      type:'success',
      autoClose:2000
    })

  }
 
  
} catch (error) {
  
}
    
  }
}

export const getProductCart = (token) =>{
  return async(dispatch , getState) =>{
    const config = {
      headers:{
        auth_token:token
      }
    }
    const {data} = await axios.get('/cart',config )
    const newData = data.map(value =>(
      {
        id:value.id,
        quantity:value.quantity,
        image:value.Coffee.image,
        name:value.Coffee.name ,
        price:value.Coffee.price,
        stock:value.Coffee.stock
      }
    ))
    dispatch(getCartProduct(newData))
  }
} 