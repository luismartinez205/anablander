import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogo from "./pages/Catalogo";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Inicio from "./pages/Inicio";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Formulario from "./components/Formulario";
import "./App.css";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />}/>
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Formulario />} />
        <Route path="/nosotros" element={<Catalogo />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


