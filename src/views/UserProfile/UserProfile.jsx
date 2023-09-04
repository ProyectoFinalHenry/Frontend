import { Link } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { informationUser } from "../../store/reducers/thunk";

import { useEffect } from "react";
import { RiProfileLine } from 'react-icons/ri'; 
import { FiUser } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { SlLocationPin } from 'react-icons/sl';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './UserProfile.css'


const UserProfile = () => {

    const {NewinformationUser} = useSelector(state => state.login)
    let token = localStorage.getItem("tokens");
    const dispatch = useDispatch();
    console.log(token);

    useEffect(() => {
        dispatch(informationUser(token))
    },[]);

    return (
      <div className="user-profile-container">

        <div className="user-profile-seccions-cont">


        <div className="user-profile-header">
          <div className="user-profile-header-photo-cont">
            <img src={NewinformationUser.image} alt="foto perfil" />
          </div>
          <div className="user-profile-name-email-cont">
            <p className="user-profile-header-name">{NewinformationUser.name}</p>
            <p className="user-profile-header-mail">{NewinformationUser.email}</p>
          </div>
        </div>



          <Link to="/user/info">
            <div className="user-profile-personal-info">
              <div className="profile-user-icon-cont">
                <RiProfileLine />
              </div>
              <p>Información personal</p>
              <p className="user-profile-personal-info-subs">
                Nombre, apellido, email, teléfono
              </p>
              <div className="user-profile-arrow">
                <MdKeyboardArrowRight />
              </div>
            </div>
          </Link>
  
          <Link to="/purchases">
            <div className="user-profile-personal-info">
              <div className="profile-user-icon-cont">
                <HiOutlineShoppingBag />
              </div>
              <p>Mis compras</p>
              <p className="user-profile-personal-info-subs">
                Historial de compras realizadas
              </p>
              <div className="user-profile-arrow">
                <MdKeyboardArrowRight />
              </div>
            </div>
          </Link>
  
          <Link to="/user/address">
            <div className="user-profile-personal-info">
              <div className="profile-user-icon-cont">
                <SlLocationPin />
              </div>
              <p>Dirección</p>
              <p className="user-profile-personal-info-subs">
                Dirección para recibir tus compras
              </p>
              <div className="user-profile-arrow">
                <MdKeyboardArrowRight />
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  
