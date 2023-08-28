import React, { useEffect } from "react";
import "./UserAccount.css";
import { useDispatch , useSelector} from "react-redux";
import { getLogOut,  } from "../../store/reducers/Login";
import logOut from "../../functions/logOut";
import {useNavigate} from "react-router-dom";
import { informationUser } from "../../store/reducers/thunk";
import Swal from "sweetalert2";

const UserAccount = ( {setAccount} ) => {
  const dispatch = useDispatch();
  const {NewinformationUser} = useSelector(state => state.login)
  const navigate = useNavigate()

  const handleClick = () =>{
    Swal.fire({
      position:"center",
      text:'Estas seguro que quieres cerrar Sesion',
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Si cerrar',
      confirmButtonColor:"#00F",
      cancelButtonText:'No cerrar'
    }).then(result =>{
      if(result.isConfirmed){
        Swal.fire('Adios','Esperamos verte aqui',"success")
        setTimeout(() =>{
          logOut()
          dispatch(getLogOut())
          setAccount(false)
          localStorage.removeItem('tokenUser')
          localStorage.removeItem('loginToken')
          navigate('/')
        },1000)
      }
    })
   
  }
  
  const userToken = localStorage.getItem('tokenUser')
  const loginToken = localStorage.getItem('loginToken')
  const response = userToken? userToken : loginToken

  useEffect(() =>{
    dispatch(informationUser(response))
  },[])


  return (
    <div className="account">
        <div className="account__User">
          <img className="account__image" src={NewinformationUser.image} alt="" />
          <p>Hola {NewinformationUser.name}</p>
          <p>ver mi perfil</p>
        </div>
        <div className="account__dateUser">
          <p>Cuenta</p>
          <p>Administrador</p>
          <p onClick={() => navigate('/create')}>Vender un Producto</p>
          <p 
          onClick={handleClick}
          className="account__logOut">Cerrar sesion</p>
        </div>
    </div>
  );
};

export default UserAccount;
