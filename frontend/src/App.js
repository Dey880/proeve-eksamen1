import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import EditProduct from "./pages/EditProduct";

function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route path="/*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}

export default App;
