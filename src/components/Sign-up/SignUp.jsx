import React , {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import { singInWithGoogle } from "../../functions/loginWithGoogle";
import { onAuthStateChanged } from "@firebase/auth";
import { FirebaseAuth } from "../../firebase/credenciales";
import { useNavigate } from "react-router";
import { NewRegisterUser, SingGoogleAndGitHub } from "../../store/reducers/thunk";
import { loginGitHub } from "../../functions/githubLogin";
import { useDispatch } from "react-redux";

const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [validando, setValidando] = useState(false)

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
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
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(values){
        const newUser = {
          name:values.name, 
          email:values.email, 
          password:values.password

        }
        dispatch(NewRegisterUser(newUser))
        setValidando(true)
        // registerUser(values.email, values.password);

        setTimeout(() =>{
          setValidando(false)
        },500)
      }
      // Aquí podrías agregar la lógica para registrar al usuario
    },
  });
  
  onAuthStateChanged(FirebaseAuth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      const registerGitAndGoogle ={
        name : usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        image: usuarioFirebase.photoURL,
      }
      dispatch(SingGoogleAndGitHub(registerGitAndGoogle))
    }
  });
  const local = localStorage.getItem('tokens')
  if(local ){
    navigate('/')
  }
    
  return (
    <div>
      <form className="formulario" onSubmit={formik.handleSubmit}>
        <div className="formulario__container">
          <h2 className="formulario__titulo">Registrate</h2>
          <div>
            <div className="formulario__cuentas">
              <div onClick={singInWithGoogle} className="formulario__google">
              <img className="formulario__googleLogo" src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png" alt="" />
              <p>Google</p>
              </div>
              <div onClick={loginGitHub} className="formulario__gitHud">
              <img className="formulario_gitHubLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png" alt="" />
              <p>Git Hub</p>
              </div>
            </div>
            <div className="formulario__contenido">
              <label htmlFor="name" className="formulario__label">
                Ingresa tu nombre
              </label>
              <input
                id="name"
                className="formulario__input"
                type="text"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="formulario__error">{formik.errors.name}</div>
              ) : null}
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
            {validando?<div class="lds-dual-ring"></div>:<p>Registrarse</p>}
          </button>
          <p onClick={()=>navigate('/auth/sing-in')}
          className="formulario__loginRegister">
            ¿tienes cuenta? Inicia Sesion.
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
