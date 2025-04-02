import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Homepage from './Homepage';
import Footer from './Footer';
import Signup from './Signup';
import Login from './Login';
import Shop from './Shop';
import Sellproducts from './Sellproducts';
import Landingpage from './Landingpage';
import Econnect from './Econnect';
import Profile from './Profile';
import Orders from './Orders';
import Payment from './Payment';
import Cart from './Cart';
import AdminLogin from './AdminLogin';
import AdminSignup from './AdminSignup';
import AddEvent from './AddEvent';
import Shopdemo from './Shopdemo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Shopdemo" element={<Shopdemo />} />
        <Route path="/sellproducts" element={<Sellproducts />} />
        <Route path="/econnect" element={<Econnect />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/AdminSignup" element={<AdminSignup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/landingpage" element={<Landingpage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;