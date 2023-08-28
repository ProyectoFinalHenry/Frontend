import { Route, Routes } from "react-router-dom";
import LandinPage from "./views/LandinPage/LandingPage";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import About from "./views/About/About";
import CreateForm from "./views/CreateForm/CreateForm";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import SignIn from "./components/Sign-in/SignIn";
import SignUp from "./components/Sign-up/SignUp";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { useEffect } from "react";
import {
  getProductCart,
  informationUser,
} from "./store/reducers/thunk";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const registerToken = localStorage.getItem("tokenUser");
  const loginToken = localStorage.getItem("loginToken");
  const response = registerToken ? registerToken : loginToken;
  useEffect(() => {
    dispatch(informationUser(response));
  }, []);

  useEffect(() => {
    const addToCart = registerToken ? registerToken : loginToken;
    dispatch(getProductCart(addToCart));
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandinPage />} />
        <Route path="/Products" element={<Home />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/products/page/:page?" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/sing-in" element={<SignIn />} />
        <Route path="/auth/sing-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
