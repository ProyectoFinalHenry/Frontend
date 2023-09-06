const validateName = (name) => {
    const errors = [];

    if (!name) {
        errors.push('El campo Nombre es obligatorio');
    } else if (name.length > 10) {
        errors.push('El nombre no puede tener más de 10 caracteres');
    }

    return errors;
}

const validateLastname = (lastname) => {
    const errors = [];

    if (!lastname) {
        errors.push('El campo Apellido es obligatorio');
    } else {
        if (lastname.length > 10) {
            errors.push('El apellido no puede tener más de 10 caracteres');
        }
        if (!/^[a-zA-Z]+$/.test(lastname)) {
            errors.push('El apellido solo puede contener letras');
        }
    }

    return errors;
}

const validateEmail = (email) => {
    const errors = [];

    if (!email) {
        errors.push('El campo Email es obligatorio');
    } else {
        if (email.length > 30) {
            errors.push('El email no puede tener más de 30 caracteres');
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errors.push('El formato del email es inválido');
        }
    }

    return errors;
}

const validatePhone = (phone) => {
    const errors = [];

    if (phone) {
        if (phone.length > 10) {
            errors.push('El teléfono no puede tener más de 10 caracteres');
        }
        const phonePattern = /^\d+$/;
        if (!phonePattern.test(phone)) {
            errors.push('El teléfono solo puede contener números');
        }
    }

    return errors;
}

const formValidations = (obj) => {
    const { name, lastname, email, phone } = obj;
    const errors = [];

    errors.push(...validateName(name));
    errors.push(...validateLastname(lastname));
    errors.push(...validateEmail(email));
    errors.push(...validatePhone(phone));

    console.warn('VALIDATIONS', errors);
    return errors;
}

export default formValidations;
