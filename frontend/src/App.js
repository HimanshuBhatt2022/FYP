
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Shop from "./Pages/Shop";
import Navbar from "./Components/Navbar/Navbar";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import LoginForm from "./Pages/Login";
import SignupForm from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import men_banner from './Components/Assets/banner_mens1.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/women" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/login"
              element={
                <LoginForm
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignupForm
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
