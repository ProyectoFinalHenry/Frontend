import Swal from 'sweetalert2';
import { FirebaseAuth } from '../firebase/credenciales';
import { signInWithEmailAndPassword } from 'firebase/auth';

const loginWithEmailPassword = async(email , password)=>{
    try {
        const user = await signInWithEmailAndPassword (FirebaseAuth , email , password)
        console.log(user)
    } catch (error) {
        if(error.code === 'auth/missing-email'){

        }
        if(error.code === 'auth/wrong-password'){
            Swal.fire({
                position:'center',
                icon:'error',
                title:'La contraseña esta mal',
                showConfirmButton:false,
                timer:1000
            })
        }
        if(error.code === 'auth/user-not-found'){
            Swal.fire({
                position:'center',
                icon:'warning',
                title:'Correo no Registrado',
                text:'No tienes cuenta create una',
                showCancelButton: false,
                timer:1000
            })
        }
    }
}

export default loginWithEmailPassword