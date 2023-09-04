import axios from "axios";
import Swal from "sweetalert2";
import { getInformationUser, getTokenUser } from "./Login";
import { toast } from "react-toastify";
import { getCartProduct } from "./shopping/shopping";
import { Navigate } from "react-router-dom";

export const informationUser = (user) => {
  return async (dispatch, getState) => {
    const authToken = user;

    const config = {
      headers: {
        auth_token: authToken,
      },
    };

    try {
      const { data } = await axios.get(`/user`, config);
      dispatch(getInformationUser(data))
    } catch (error) {
      console.log(error);
    }
  };
};

//autenticion de terceros

export const SingGoogleAndGitHub = (email) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post('/user/thirdAutentication', email)
      localStorage.setItem("tokens", data.auth_token);
      setTimeout(() => {
        window.location.href = "/";
      }, 1 * 1500);
    } catch (error) {
      console.log({ error })
    }
  }
}

//register
export const NewRegisterUser = (newUser) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/user/signup", newUser);
      console.log(data)
      if (data) {
        setTimeout(() => {
          window.location.href = "/";
        }, 1 * 1500);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Correo Registrado correctamente",
          showConfirmButton: false,
          timer: 900,
        });
      }
      localStorage.setItem("tokens", data.auth_token);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Error con el servidor Ingrese mas tarde",
          showConfirmButton: false,
          timer: 900,
        });
      }
      if (error.code === "ERR_BAD_RESPONSE") {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: `${error.response.data.error}`,
          showConfirmButton: false,
          timer: 900,
        });
      }
    }
  };
};

//Login
export const SingInUserLogin = (userLogin) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(`/user/login`, userLogin);
      dispatch(getTokenUser(data));
      if (data) {
        console.log(data);
       /** setTimeout(() => {
          window.location.href = "/";
        }, 1 * 1500);**/
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Bienvenido",
          showConfirmButton: false,
          timer: 900,
        });
      }
      console.log('user token;', data.auth_token);
      localStorage.setItem("tokens", data.auth_token);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        console.log("ERR_BAD_REQUEST");
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

export const getProductAdd = (token, cantidad) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        auth_token: token,
      },
    };
    try {
      const { data } = await axios.post('/cart/add', cantidad, config)
      console.log(data)
      if (data) {
        toast(data.status, {
          position: 'bottom-right',
          type: 'success',
          autoClose: 2000
        })

      }
    } catch (error) {

    }

  }
}

export const getProductCart = (token) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        auth_token: token
      }
    }
    const { data } = await axios.get('/cart', config)
    const newData = data.map(value => (
      {
        id: value.Coffee.id,
        quantity: value.quantity,
        image: value.Coffee.image,
        name: value.Coffee.name,
        price: value.Coffee.price,
        stock: value.Coffee.stock
      }
    ))
    dispatch(getCartProduct(newData))
  }
}

export const getProductoDelete = (id, token) => {
  return async (dispatch, getState) => {
    console.log(token)
    const config = {
      headers: {
        auth_token: token
      },
      data: {
        coffeeId: id
      }
    }
    try {
      const data = await axios.delete('/cart/delete', config)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
}