import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { FirebaseAuth } from "../firebase/credenciales";    
import Swal from "sweetalert2";

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async() =>{
    try {
        const credentials = await signInWithPopup(FirebaseAuth , googleProvider)
        console.log(credentials)
        if(credentials.operationType === 'signIn'){
            Swal.fire({
                position:'center',
                icon:'success',
                title:`Bienvenido ${credentials.user.displayName}`,
                showConfirmButton:false,
                timer:1000
            })
        }
    } catch (error) {
        console.log(error)
    }
}