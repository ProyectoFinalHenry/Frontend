import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandinPage from './views/LandinPage/LandingPage';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import AuthForm from './views/AuthForm/AuthForm';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<LandinPage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/AuthForm" element={<AuthForm />} />
        </Routes>
        <Footer />

    </div>
  );
}

export default App;
