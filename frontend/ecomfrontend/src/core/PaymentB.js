import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signout } from "../auth/helper";
import { useNavigate } from "react-router-dom";

import DropIn from "braintree-web-drop-in-react";

export const PaymentB = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;
  const navigate = useNavigate();

  console.log(userId);
  console.log(token);

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info && info.error) {
        setInfo({
          ...info,
          error: info.error,
        });

        signout(() => {
          return <Navigate to="/" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({
          ...info,
          clientToken,
        });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.forEach((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            if (response.error) {
              if (response.code == "1") {
                console.log("PAYMENT FAILED");
              }
            } else {
              setInfo({
                ...info,
                success: response.success,
                loading: false,
              });

              console.log("PAYMENT SUCCESS");
              let product_name = "";
              products.forEach(function (item) {
                product_name += item.name + ", ";
              });

              const orderData = {
                product: product_name,
                transaction_id: response.transaction_id,
                amount: response.transaction_amount,
              };

              createOrder(userId, token, orderData)
                .then((response) => {
                  if (response.error) {
                    if (response.code == "1") {
                      console.log("ORDER FAILED");
                    }
                  }
                  console.log("ORDER RESPONSE", response);

                  console.log("PRODUCTS", products);
                  
                  // ✅ GET OLD ORDERS
                  let oldOrders = [];

                  try {
                    oldOrders =
                      JSON.parse(localStorage.getItem("orderData")) || [];

                    // ✅ IF NOT ARRAY
                    if (!Array.isArray(oldOrders)) {
                      oldOrders = [];
                    }
                  } catch (error) {
                    oldOrders = [];
                  }

                  // ✅ NEW ORDER
                  const newOrder = {
                    items: [...products],
                    total: getAmount(),
                    payment: "Card",
                    status: "Confirmed",
                  };

                  // ✅ SAVE ALL ORDERS
                  localStorage.setItem(
                    "orderData",
                    JSON.stringify([...oldOrders, newOrder]),
                  );

                  navigate("/user/orders", {
                    state: {
                      items: products,

                      total: getAmount(),

                      payment: "Card",

                      status: "Confirmed",
                    },
                  });

                  console.log("ORDER PAGE NAVIGATED");
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("ORDER FAILED", error);
                });

              cartEmpty(() => {
                console.log("CART IS EMPTY OUT");
              });

              setReload(!reload);
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log("NONCE", e));
  };

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button onClick={onPurchase} className="btn btn-block btn-success">
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please login first or add something in cart</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>Your bill is {getAmount()}</h3>
      {showbtnDropIn()}
    </div>
  );
};
