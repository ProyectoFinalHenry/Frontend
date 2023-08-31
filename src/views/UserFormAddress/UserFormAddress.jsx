import React, { useState } from 'react';
import { FiHome, FiBriefcase } from 'react-icons/fi';
import './UserFormAddress.css';
import { validateForm} from './FormValidations';




const UserFormAddress = () => {

  const [errors, setErrors] = useState({}); 
  const [formData, setFormData] = useState({
    postalCode: '',
    province: '',
    locality: '',
    street: '',
    number: '',
    floor: '',
    betweenStreets: {
      street1: '',
      street2: '',
    },
    residenceType: '',
    additionalInstructions: '',
  });

  const [remainingChars, setRemainingChars] = useState(128);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedFormData = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      };
    
      setFormData(updatedFormData);
      const validationErrors = validateForm(updatedFormData);
      setErrors(validationErrors);

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === 'additionalInstructions') {
        setRemainingChars(128 - value.length);
      }
    }
  };

  const handleResidenceType = (type) => {
    setFormData({
      ...formData,
      residenceType: type,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData); 
    setErrors(validationErrors); 

    if (Object.keys(validationErrors).length === 0) {
      // Acá enviar petición al back
    }
  };

  return (
    <div className="user-form-address-container">
      <form className="user-form-address" onSubmit={handleSubmit}>
        <h2>Datos de Dirección</h2>
        <div className="user-form-address-field">
          <label htmlFor="postalCode">Código Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="user-form-address-input"
          />
        </div>

        <div className="user-form-p-l-c-n-container">
          <div className="user-form-p-l-c-n-child">
            <div className="user-form-address-field user-prov-input">
              <label htmlFor="province">Provincia</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="user-form-address-input"
              />
            </div>

            <div className="user-form-address-field user-prov-input">
              <label htmlFor="locality">Localidad</label>
              <input
                type="text"
                id="locality"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                className="user-form-address-input"
              />
            </div>
          </div>

          <div className="user-form-p-l-c-n-child">
            <div className="user-form-address-field">
              <label htmlFor="street">Calle/Avenida</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="user-form-address-input"
              />
            </div>

            <div className="user-form-address-field">
              <label htmlFor="number">Número</label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="user-form-address-input"
              />
            </div>
          </div>
        </div>

        <div className="user-form-address-field user-form-address-floor">
          <label htmlFor="floor">Piso/Departamento (opcional)</label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="user-form-address-input"
          />
        </div>

        <div className="user-form-address-field">
          <label htmlFor="betweenStreets">
            ¿Entre qué calles está? (opcional)
          </label>
          <input
            type="text"
            id="street1"
            name="betweenStreets.street1"
            value={formData.betweenStreets.street1}
            onChange={handleChange}
            className="user-form-address-input user-form-address-between-streets"
            placeholder="Calle 1"
          />
          <input
            type="text"
            id="street2"
            name="betweenStreets.street2"
            value={formData.betweenStreets.street2}
            onChange={handleChange}
            className="user-form-address-input"
            placeholder="Calle 2"
          />
        </div>

        <div className="user-form-address-field">
          <label htmlFor="residenceType">¿Es tu trabajo o casa?</label>
          <div className="user-form-address-residence user-form-address-custom">
            <div
              className={`user-form-address-custom-radio ${
                formData.residenceType === "Casa" ? "selected" : ""
              }`}
              onClick={() => handleResidenceType("Casa")}
            >
              <FiHome />
              Casa
            </div>
            <div
              className={`user-form-address-custom-radio ${
                formData.residenceType === "Trabajo" ? "selected" : ""
              }`}
              onClick={() => handleResidenceType("Trabajo")}
            >
              <FiBriefcase />
              Trabajo
            </div>
          </div>
        </div>

        <div className="user-form-address-field">
          <label htmlFor="additionalInstructions">
            Indicaciones adicionales (opcional)
          </label>
          <textarea
            id="additionalInstructions"
            name="additionalInstructions"
            value={formData.additionalInstructions}
            onChange={handleChange}
            className="user-form-address-textarea"
            placeholder="Descripción de la fachada, puntos de referencia para encontrarla, indicaciones de seguridad, etc."
            maxLength="128"
          />
          <p className="user-form-address-characters-remaining">
            Caracteres restantes: {remainingChars}
          </p>
        </div>

        <button
            type="submit"
            className={`user-form-address-button ${
                Object.keys(errors).length > 0 ? "user-form-address-button-disabled" : ""
            }`}
            disabled={Object.keys(errors).length > 0}
            >
            Guardar
        </button>

        {/* MENSAJE DE ERRORES */}
        {Object.keys(errors).length > 0 && (
        <div className="user-form-address-errors">
            <p className="user-form-address-error">{Object.values(errors)[0]}</p>
        </div>
        )}

      </form>
    </div>
  );

};

export default UserFormAddress;