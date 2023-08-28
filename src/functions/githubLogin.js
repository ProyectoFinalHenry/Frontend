import { GithubAuthProvider , signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../firebase/credenciales"

const provider = new GithubAuthProvider()

export const loginGitHub =  async() =>{
    try {
        const credencials = await signInWithPopup(FirebaseAuth , provider)
        console.log(credencials)
    } catch (error) {
        console.log(error)
    }
}