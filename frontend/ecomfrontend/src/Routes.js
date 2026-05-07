import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./core/Home";
import Card from "./core/Card";
import { PrivateRoutes } from "./auth/helper/PrivateRoutes";
import { Signup } from "./user/Signup";
import { UserOrders } from "./user/UserOrders";
import { Signin } from "./user/Signin";
import { Cart } from "./core/Cart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/user/orders" element={<PrivateRoutes><UserOrders /></PrivateRoutes>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
