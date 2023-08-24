import { Route, Routes } from 'react-router-dom';
import LandinPage from './views/LandinPage/LandingPage';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import About from "./views/About/About"
import AuthForm from './views/AuthForm/AuthForm';
import CreateForm from './views/CreateForm/CreateForm';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/Products" element={<Home />} />
          <Route path="/create" element={<CreateForm/>} />
          <Route path="/products/page/:page?" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path = "/about" element = {<About/>}/>
          <Route path="/auth/form" element={<AuthForm />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
