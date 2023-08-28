import { FirebaseAuth,  } from '../firebase/credenciales';
import { signOut } from 'firebase/auth';

const logOut = async() =>{
try {
await signOut(FirebaseAuth)
} catch (error) {
console.log(error)
}
}
export default logOut