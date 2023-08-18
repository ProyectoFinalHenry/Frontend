import { Route, Routes } from 'react-router-dom';
import LandinPage from './views/LandinPage/LandingPage';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import AuthForm from './views/AuthForm/AuthForm';
import CreateForm from './views/CreateForm/CreateForm';
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/Products" element={<Home />} />
          <Route path="/Create" element={<CreateForm/>} />
          <Route path="/products/page/:page?" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/auth/form" element={<AuthForm />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
