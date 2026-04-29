import React, { useState } from "react";
import { ImageHelper } from "./helper/imageHelper";
import { Navigate } from "react-router-dom";
import { addItemToCart, removieItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";



const Card = ({ product, addtoCart = true, removeFromCart = false, reload = undefined, setReload = f => f, }) => {

  const [redirect, setRedirect]=useState(false)
  const cardTitle = product ? product.name : "Default photo";
  const cardDiscription = product ? product.discription : "Default discription";
  const carPrice = product ? product.price : "default price";

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Navigate to="cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block mt-2 mb-2"
          style={{
            backgroundColor: "#FF4FA3",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removieItemFromCart(product._id);
            setReload(!reload)
            console.log("Product removed from cart");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
        border: "2px solid #FF4FA3",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="card-header lead "
        style={{
          backgroundColor: "#121212",
          color: "#FFFFFF",
          borderBottom: "1px solid #FF4FA3",
        }}
      >
        {cardTitle}
      </div>
      <div className="card-body">
       {getAredirect(redirect)} 
        <ImageHelper product={product} />

        <p
          className="lead font-weight-normal text-wrap"
          style={{
            backgroundColor: "#2C2C2C",
            color: "#FFD6E8",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {cardDiscription}
        </p>

        <p
          className="btn rounded btn-sm px-4"
          style={{
            backgroundColor: "#FFC107",
            color: "#121212",
            fontWeight: "bold",
            border: "none",
          }}
        >
          $ {carPrice}
        </p>

        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
