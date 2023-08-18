import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../firebase/credenciales";

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async() =>{
    try {
        const credentials = await signInWithPopup(FirebaseAuth , googleProvider)
        console.log(credentials)
    } catch (error) {
        console.log(error)
    }
}