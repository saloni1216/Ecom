import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./core/Home"
import Card from "./core/Card"

const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
        </Routes>
        </BrowserRouter>

    )
}

export default Router