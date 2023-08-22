import React, { useState } from "react";
import "./AuthForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { singInWithGoogle } from "../../functions/loginWithGoogle";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/credenciales";
import { useNavigate } from "react-router-dom";
import loginWithEmailPassword from "../../functions/loginWithEmailPassword";

const SignIn = () => {
    const navigate = useNavigate();
     const [contraseña, setContraseña] = useState('')
     const [ver , setVer] = useState(false)

    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Ingresa un correo válido")
        .required("El correo es requerido"),
      password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        "La contraseña debe contener al menos una mayúscula y un número"
      )
    });
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        loginWithEmailPassword(values.email ,values.password );
        // Aquí podrías agregar la lógica para registrar al usuario
      },
    });
  
    onAuthStateChanged(FirebaseAuth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        console.log(usuarioFirebase);
        navigate("/");
      }
    });
  return (
    <form className="formulario" onSubmit={formik.handleSubmit}>
        <div className="formulario__container">
          <h2 className="formulario__titulo">Inicia Sesión</h2>
          <div>
            <div className="formulario__cuentas">
              <div onClick={singInWithGoogle} className="formulario__google">
                Ingresa con Google
              </div>
              <div className="formulario__gitHud">Ingresa con Git Hud</div>
            </div>
            
            <div className="formulario__contenido">
              <label htmlFor="email" className="formulario__label">
                Ingresa tu correo
              </label>
              <input
                id="email"
                className="formulario__input"
                type="text"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="formulario__error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="formulario__contenido">
              <label htmlFor="password" className="formulario__label">
                Ingresa tu contraseña
              </label>
              <input
                id="password"
                className="formulario__input"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="formulario__error">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <button type="submit" className="formulario__login">
            Inicia Sesion
          </button>
          <p onClick={()=>navigate('/auth/sing-up')} 
          className="formulario__loginRegister">
            ¿No tienes cuenta? Regístrate.
          </p>
        </div>
      </form>
  );
};

export default SignIn;
