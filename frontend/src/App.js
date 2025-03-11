import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/profile" element={<Profile />}></Route>

                <Route path="/*" element={<NotFound />}></Route>
            </Routes>

        </div>
    );
}

export default App;
