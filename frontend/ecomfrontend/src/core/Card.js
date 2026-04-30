import React, { useState } from "react";
import { ImageHelper } from "./helper/imageHelper";
import { Navigate } from "react-router-dom";
import { addItemToCart, removieItemFromCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";

const Card = ({ product, addtoCart = true, removeFromCart = false, reload = undefined, setReload = f => f, }) => {

  const [redirect, setRedirect] = useState(false)
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
            flex: 1,
            backgroundColor: "#FF4FA3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "9px 10px",
            fontWeight: "600",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          🛒 Add to Cart
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
      style={{
        backgroundColor: "#1a1a1a",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* ✅ Image box with New badge */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", backgroundColor: "#f0f0f0" }}>
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          backgroundColor: "#FF4FA3", color: "#fff",
          fontSize: "0.72rem", fontWeight: "700",
          padding: "4px 12px", borderRadius: "20px", zIndex: 2,
        }}>
          New
        </span>
        {getAredirect(redirect)}
        <ImageHelper product={product} />
      </div>

      {/* ✅ Card body */}
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>

        {/* Title */}
        <h6 style={{ color: "#ffffff", fontWeight: "700", fontSize: "1rem", margin: "0 0 4px 0" }}>
          {cardTitle}
        </h6>

        {/* Price */}
        <p style={{ color: "#FF4FA3", fontWeight: "700", fontSize: "1.1rem", margin: "0 0 6px 0" }}>
          ₹ {carPrice}
        </p>

        {/* Description */}
        <p style={{ color: "#aaaaaa", fontSize: "0.82rem", margin: "0 0 14px 0", flexGrow: 1, lineHeight: "1.4" }}>
          {cardDiscription}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
          {showAddToCart(addToCart)}
          <button style={{
            flex: 1,
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "2px solid #ffffff",
            borderRadius: "8px",
            padding: "9px 10px",
            fontWeight: "600",
            fontSize: "0.8rem",
            cursor: "pointer",
          }}>
            👁 View Details
          </button>
          {showRemoveFromCart(removeFromCart)}
        </div>

      </div>
    </div>
  );
};

export default Card;