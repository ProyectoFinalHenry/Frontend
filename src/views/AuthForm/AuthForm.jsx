import React, { useState } from "react";
import "./AuthForm.css";
import  { singInWithGoogle } from "../../functions/loginWithGoogle";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/credenciales";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(FirebaseAuth, (usuarioFirebase) =>{
    if(usuarioFirebase){
      console.log(usuarioFirebase)
  navigate('/')
    }
  })

  return (
    <form className="formulario" >
      <div className="formulario__container">
        <h2 className="formulario__titulo" >Inicia Sesion</h2>
        <div>
          <div className="formulario__cuentas">
            <div onClick={singInWithGoogle} className="formulario__google">Ingresa con Google</div>
            <div className="formulario__gitHud">Ingresa con Git Hud</div>
          </div>
          <div className="formulario__contenido">
            <label htmlFor="" className="formulario__label">
              Ingresa tu nombre
            </label>
            <input
              className="formulario__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="formulario__contenido">
            <label htmlFor="" className="formulario__label">
              Ingresa tu correo
            </label>
            <input
              className="formulario__input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formulario__contenido">
            <label htmlFor="" className="formulario__label">
              Ingresa tu contraseña
            </label>
            <input
              className="formulario__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" className="formulario__login"/>
        <p className="formulario__loginRegister">No tienes cuenta registrate ?</p>
      </div>
    </form>
  );
};

export default AuthForm;
