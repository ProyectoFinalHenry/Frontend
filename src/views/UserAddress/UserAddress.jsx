import { useState, useEffect } from 'react';
import UserFormAddress from '../../components/UserFormAddress/UserFormAddress';
import './UserAddress.css';
import { LiaHomeSolid } from 'react-icons/lia'
import { SlArrowLeft } from 'react-icons/sl'
import {  getUserData } from '../../services/api';
import Spinner from '../../components/Spinner/Spinner';



const UserAddress = () => {

  const [userAddress, setUserAddress] = useState();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);


  
  useEffect(() => {
    const getUserAdress = async () => {
        const data = await getUserData();
        setUserAddress(data.address);
        setLoading(false);
    }
    getUserAdress();
}, []);


  console.log('GET USER DATA: ', userAddress);
        

    const handleEdit = () => {
        setEdit(!edit);
    }



    return (
      <div className="user-address-container">
        {edit ? (
          <div className="user-address-form-c">
            <button className="user-address-return-button" onClick={handleEdit}>
              <SlArrowLeft />
              Regresar
            </button>
            <UserFormAddress />
          </div>
        ) : (
          <div className="user-address-card">
            {loading ? <div className="user-address-card-spinner"> <Spinner />  </div>: null}
            <div className="user-address-icon-h2-container">
              <LiaHomeSolid />
              <h2 className="user-address-h2">Domicilio</h2>
            </div>
            <h5 className="user-address-card-sub-title">Información de Envío</h5>
            {userAddress && Object.keys(userAddress).length > 0 ? (
              <>
                <p className="card-text">
                  <strong>Código Postal:</strong> {userAddress.postalCode}
                </p>
                <p className="card-text">
                  <strong>Provincia:</strong> {userAddress.province}
                </p>
                <p className="card-text">
                  <strong>Localidad:</strong> {userAddress.locality}
                </p>
                <p className="card-text">
                  <strong>Calle:</strong> {userAddress.street}
                </p>
                <p className="card-text">
                  <strong>Número:</strong> {userAddress.number}
                </p>
    
                {userAddress.floor && (
                  <p className="card-text">
                    <strong>Piso:</strong> {userAddress.floor}
                  </p>
                )}
    
                {userAddress.betweenStreets.street1 && (
                  <p className="card-text">
                    <strong>Entre Calles:</strong> {userAddress.betweenStreets.street1} y{" "}
                    {userAddress.betweenStreets.street2}
                  </p>
                )}
    
                <p className="card-text">
                  <strong>Tipo de Residencia:</strong> {userAddress.residenceType}
                </p>
    
                {userAddress.additionalInstructions && (
                  <p className="card-text">
                    <strong>Instrucciones Adicionales:</strong>{" "}
                    {userAddress.additionalInstructions}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="card-text">
                  <strong>Código Postal:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Provincia:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Localidad:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Calle:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Número:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Piso:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Entre Calles:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Tipo de Residencia:</strong>{" "}
                </p>
                <p className="card-text">
                  <strong>Instrucciones Adicionales:</strong>{" "}
                </p>
              </>
            )}
    
            <button className="user-address-button" onClick={handleEdit}>
              Editar
            </button>
          </div>
        )}
      </div>
    );
    
    
    };





export default UserAddress;



/* 

const data = {
    postalCode: '12345',
    province: 'California',
    locality: 'Los Angeles',
    street: 'Main Street',
    number: '1234',
    floor: '5',                
    betweenStreets: {
      street1: 'First Avenue', 
      street2: 'Second Avenue',
    },
    residenceType: 'Apartment',
    additionalInstructions: 'Please leave the package at the front desk.'
  }
*/