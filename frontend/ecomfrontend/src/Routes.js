import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./core/Home";
import Card from "./core/Card";
import { PrivateRoutes } from "./auth/helper/PrivateRoutes";
import { Signup } from "./user/Signup";
import { UserDashboard } from "./user/UserDashboard";
import { Signin } from "./user/Signin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/dashboard" element={<PrivateRoutes><UserDashboard /></PrivateRoutes>}/>

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
