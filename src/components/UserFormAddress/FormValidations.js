// FormValidations.js

export const validateForm = (formData) => {
    const errors = {};
  
    // Validación para el Código Postal
    if (!formData.postalCode) {
      errors.postalCode = 'Código Postal es requerido';
    } else if (!/^\d{4}$/.test(formData.postalCode)) {
      errors.postalCode = 'Código Postal debe contener 5 dígitos';
    }
  
    // Validación para la Provincia
    if (!formData.province) {
      errors.province = 'Provincia es requerida';
    }
  
    // Validación para la Localidad
    if (!formData.locality) {
      errors.locality = 'Localidad es requerida';
    }
  
    // Validación para la Calle/Avenida
    if (!formData.street) {
      errors.street = 'Calle/Avenida es requerida';
    }
  
    // Validación para el Número
    if (!formData.noNumber && !formData.number) {
      errors.number = 'Número es requerido';
    }
  
    // Validación para el Piso/Departamento
    if (formData.floor && !/^\d+$/.test(formData.floor)) {
      errors.floor = 'Piso/Departamento debe ser un número';
    }
  
    // Validación para Entre qué calles está
    if (formData.betweenStreets.street1 && !formData.betweenStreets.street2) {
      errors.street2 = 'Debe completar la segunda calle';
    }

    if (formData.betweenStreets.street2 && !formData.betweenStreets.street1) {
      errors.street2 = 'Debe completar la primera calle';
    }
  
    // Validación para el Tipo de Residencia
    if (!formData.residenceType) {
      errors.residenceType = 'Debe seleccionar una opción';
    }
  
    // Validación para las Indicaciones adicionales
    if (formData.additionalInstructions.length > 128) {
      errors.additionalInstructions = 'Máximo 128 caracteres permitidos';
    }
  

   return errors ? errors : {none: ''}
  };
  

