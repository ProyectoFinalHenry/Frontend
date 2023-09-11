import React, { useEffect, useState } from "react";
import "./AuthForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { singInWithGoogle } from "../../functions/loginWithGoogle";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/credenciales";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAndLogOut } from "../../store/reducers/Login";
import { loginGitHub } from "../../functions/githubLogin";
import {
  SingGoogleAndGitHub,
  SingInUserLogin,
} from "../../store/reducers/thunk";

const SignIn = () => {
  const navigate = useNavigate();

  const {TokenUser} = useSelector(state => state.login)
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo válido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        "La contraseña debe contener al menos una mayúscula y un número"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const LoginUser = {
        email: values.email,
        password: values.password,
      };
      try {
        dispatch(SingInUserLogin(LoginUser));
      } catch (error) {
        console.log(error);
      }
      // Aquí podrías agregar la lógica para registrar al usuario
    },
  });
  if(TokenUser){
    navigate('/')
  }

  onAuthStateChanged(FirebaseAuth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      const autentication = {
        name: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        image: usuarioFirebase.photoURL,
      };
      dispatch(SingGoogleAndGitHub(autentication));
    }
  });

  return (
    <form className="formulario" onSubmit={formik.handleSubmit}>
      <div className="formulario__containerIn">
        <h2 className="formulario__tituloIn">Inicia Sesión</h2>
        <div>
          <div className="formulario__logo">
            <img
              className="formulario__grano"
              src="/assets/images/logo-3-white.png"
              alt="logo"
            />
          </div>
          <div className="formulario__cuentasIn">
            <div onClick={singInWithGoogle} className="formulario__google">
              <img
                className="formulario__googleLogo"
                src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
                alt=""
              />
              <p>Google</p>
            </div>
            <div className="formulario__gitHud" onClick={loginGitHub}>
              <img
                className="formulario_gitHubLogo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
                alt=""
              />
              <p>Git Hub</p>
            </div>
          </div>

          <div className="formulario__contenidoIn">
            <label htmlFor="email" className="formulario__label">
              Ingresa tu correo
            </label>
            <input
              className="formulario__input"
              type="text"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="formulario__error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="formulario__contenidoIn">
            <label htmlFor="password" className="formulario__label">
              Ingresa tu contraseña
            </label>
            <input
              className="formulario__input"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="formulario__error">{formik.errors.password}</div>
            ) : null}
          </div>
        </div>
        <button type="submit" className="formulario__loginIn">
          Inicia Sesion
        </button>
        <p className="formulario__restablecer"
        onClick={() => navigate('/send/reset')}
        >
          ¿Olvidaste tu contraseña?
        </p>
        <p
          onClick={() => navigate("/auth/sing-up")}
          className="formulario__loginRegister"
        >
          ¿No tienes cuenta? Regístrate.
        </p>
      </div>
    </form>
  );
};

export default SignIn;