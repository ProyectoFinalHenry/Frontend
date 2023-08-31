import { useState } from 'react';
import UserFormAddress from '../UserFormAddress/UserFormAddress';
import './UserAddress.css';
import { LiaHomeSolid } from 'react-icons/lia'
import { SlArrowLeft } from 'react-icons/sl'

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

const UserAddress = () => {
        
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(!edit);
    }

    return (
      <div className="user-address-container">

        {edit?(
        <div className='user-address-form-c'>
            <button className="user-address-return-button" onClick={handleEdit}>
              <SlArrowLeft />
              Regresar
            </button>
          <UserFormAddress />
        </div>
        ):(
        <div className="user-address-card">
          <div className="user-address-icon-h2-container">
            <LiaHomeSolid />
            <h2 className="user-address-h2">Domicilio</h2>
          </div>
          <h5 className="user-address-card-sub-title">Información de Envío</h5>
          <p className="card-text">
            <strong>Código Postal:</strong> {data.postalCode}
          </p>
          <p className="card-text">
            <strong>Provincia:</strong> {data.province}
          </p>
          <p className="card-text">
            <strong>Localidad:</strong> {data.locality}
          </p>
          <p className="card-text">
            <strong>Calle:</strong> {data.street}
          </p>
          <p className="card-text">
            <strong>Número:</strong> {data.number}
          </p>

          {data.floor && (
            <p className="card-text">
              <strong>Piso:</strong> {data.floor}
            </p>
          )}

          {data.betweenStreets.street1 && (
            <p className="card-text">
              <strong>Entre Calles:</strong> {data.betweenStreets.street1} y{" "}
              {data.betweenStreets.street2}
            </p>
          )}

          <p className="card-text">
            <strong>Tipo de Residencia:</strong> {data.residenceType}
          </p>

          {data.additionalInstructions && (
            <p className="card-text">
              <strong>Instrucciones Adicionales:</strong>{" "}
              {data.additionalInstructions}
            </p>
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