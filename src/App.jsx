import { Route, Routes } from 'react-router-dom';
import LandinPage from './views/LandinPage/LandingPage';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import About from "./views/About/About"
import CreateForm from './views/CreateForm/CreateForm';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Cart from './components/Cart/Cart';
import './App.css';
import SignIn from './components/Sign-in/SignIn';
import SignUp from './components/Sign-up/SignUp';
import { getLoginAndLogOut } from './store/reducers/Login';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from './firebase/credenciales';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

function App() {
  const dispatch = useDispatch()
  onAuthStateChanged(FirebaseAuth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      dispatch(getLoginAndLogOut())
      navigate("/");
    }
  });
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/Products" element={<Home />} />
          <Route path="/create" element={<CreateForm/>} />
          <Route path="/products/page/:page?" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path='/shoppingCart' element={<ShoppingCart/>}/>
          <Route path = "/about" element = {<About/>}/>
          
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
