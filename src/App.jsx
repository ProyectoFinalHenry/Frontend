import { Route, Routes, Navigate } from "react-router-dom";
import LandinPage from "./views/LandinPage/LandingPage";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import About from "./views/About/About";
import CreateForm from "./views/CreateForm/CreateForm";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar.jsx";
import "./App.css";
import SignIn from "./components/Sign-in/SignIn";
import SignUp from "./components/Sign-up/SignUp";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

import UserProfile from "./views/UserProfile/UserProfile.jsx"
import UserAddress from "./views/UserAddress/UserAddress";
import Purchases from "./views/Purchases/Purchases";
import { useEffect, useState } from "react";


function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState('');
  useEffect(() => {
    setUsuarioAutenticado(localStorage.getItem("tokens"));
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
        <Route path="/about" element={<About />} />
        <Route path="/user/account" element={!usuarioAutenticado ? <Navigate to="/" /> : <UserProfile />} />
        <Route path="/user/address" element={!usuarioAutenticado ? <Navigate to="/" /> : <UserAddress />} />
        <Route path="/shoppingCart" element={!usuarioAutenticado ? <Navigate to="/" /> : <ShoppingCart />} />
        <Route path="/auth/sing-in" element={usuarioAutenticado ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/auth/sing-up" element={usuarioAutenticado ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/purchases" element={<Purchases />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
