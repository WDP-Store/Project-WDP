import React, { createContext, useContext, useState } from 'react';
import { Outlet, useLocation  } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { CartContext } from '../components/CartContext'
import HeaderHome from './HeaderHome';

// Create provider tat use in intier page
function LayoutProvider({ children }) {
  if (!localStorage.getItem("cart")) localStorage.setItem("cart", JSON.stringify([]));
  const [cartQuantity, setCartQuantity] = useState(JSON.parse(localStorage.getItem("cart")).length);


  return (
    <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

const Layout = () => {
  const location = useLocation();
  return (
    <LayoutProvider>
      {/* {location.pathname === '/' ? <HeaderHome /> : <Header />} */}
      {location.pathname === '/' ? <Header /> : <Header />}
      <Outlet />
      <Footer />
    </LayoutProvider>
  );
};

export default Layout;
