import Swal from "sweetalert2";
import { FirebaseAuth } from "../firebase/credenciales";
import { createUserWithEmailAndPassword } from "firebase/auth";

const registerUser = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
    if(user.operationType === 'signIn'){
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Correo Registrado correctamente",
          showConfirmButton: false,
          timer: 900,
        });
    }
  } catch (error) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "El correo ya esta registrado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};

export default registerUser;
