import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
          <Route path="/Detail" element={<Detail />} />
          <Route path="/AuthForm" element={<AuthForm />} />
          <Route path="/Create" element={<CreateForm/>} />
        </Routes>
        <Footer />

    </div>
  );
}

export default App;
