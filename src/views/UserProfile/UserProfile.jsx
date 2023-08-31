import { Link } from "react-router-dom";
import { RiProfileLine } from 'react-icons/ri'; 
import { FiUser } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { SlLocationPin } from 'react-icons/sl';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './UserProfile.css'


const UserProfile = () => {
    return (
      <div className="user-profile-container">
        <div className="user-profile-seccions-cont">
          <Link to="/">
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
  
          <Link to="/">
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
  
