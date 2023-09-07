// FormValidations.js

export const validateForm = (formData) => {
  const errors = {};

  // Validación para el Código Postal
  if (!formData.postalCode) {
    errors.postalCode = "Código Postal es requerido";
  } else {
    const postalCode = formData.postalCode.trim();
    if (!/^\d{4}$/.test(postalCode)) {
      errors.postalCode = "Código Postal debe contener 4 dígitos";
    }
    if (isNaN(postalCode)) {
      errors.postalCode = "Codigo Postal debe ser un numero";
    }
  }

  // Validación para la Provincia
  if (!formData.province) {
    errors.province = "Provincia es requerida";
  } else {
    const province = formData.province.trim();
    if (!isNaN(province)) {
      errors.province = "Provincia debe ser un texto";
    }
  }

  // Validación para la Localidad
  if (!formData.locality) {
    errors.locality = "Localidad es requerida";
  } else {
    const locality = formData.locality.trim();
    if (!isNaN(locality)) {
      errors.locality = "Localidad debe ser un texto";
    }
  }

  // Validación para la Calle/Avenida
  if (!formData.street) {
    errors.street = "Calle/Avenida es requerida";
  } else {
    const street = formData.street.trim();
    if (!isNaN(street)) {
      errors.street = "Calle/Avenida debe ser un texto";
    }
  }

  // Validación para el Número
  if (!formData.number) {
    errors.number = "Número es requerido";
  } else {
    const number = formData.number.trim();
    if (!number.length) {
      errors.number = "Número es requerido";
    }
    if (isNaN(number)) {
      errors.number = "Número debe ser un numero";
    }
  }

  // Validación para el Piso/Departamento
  if (formData.floor && !/^\d+$/.test(formData.floor)) {
    errors.floor = "Piso/Departamento debe ser un número";
  }

  // Validación para Entre qué calles está
  if (formData.betweenStreets.street1 && !formData.betweenStreets.street2) {
    errors.street2 = "Debe completar la segunda calle";
  }

  if (formData.betweenStreets.street2 && !formData.betweenStreets.street1) {
    errors.street2 = "Debe completar la primera calle";
  }

  // Validación para el Tipo de Residencia
  if (!formData.residenceType) {
    errors.residenceType = "Debe seleccionar una opción";
  }

  // Validación para las Indicaciones adicionales
  if (formData.additionalInstructions.trim().length > 128) {
    errors.additionalInstructions = "Máximo 128 caracteres permitidos";
  }

  return errors ? errors : { none: "" };
};
