import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signout } from "../auth/helper";

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
    setInfo({loading: true})
    let nonce;
    let getNonce = info.instance.requestPaymentMethod()
    .then(data => {
      nonce = data.nonce
      const paymentData = {
        paymentMethodNonce : nonce,
        amount : getAmount()
      };
      processPayment(userId, token, paymentData)
      .then(response => {
        if(response.error){
          if(response.code == '1'){
            console.log("PAYMENT FAILED")
            signout(() => {
              return <Navigate to= "/" />
            })
          }
        }else{
          setInfo({
            ...info,
            success: response.success, loading: false
          })

          console.log("PAYMENT SUCCESS")
          let product_name = ""
          products.forEach(function(item){
            product_name += item.name + ", "
          });

          const orderData = {
            product: product_name,
            transaction_id : response.transaction_id,
            amount : response.transaction_amount
          }

          createOrder(userId, token, orderData)
          .then(response => {
            if(response.error){
              if(response.code == "1"){
                console.log("ORDER FAILED")
              }

              signout(() => {
                return <Navigate to="/"/>
              })
            }else{
              if(response.success == true){
                console.log("ORDER PLACED")
              }
            }
          })
          .catch(error =>{
            setInfo({loading: false, success: false})
            console.log("ORDER FAILED", error)
          })

          cartEmpty(() => {
            console.log("CART IS EMPTY OUT")
          })

          setReload(!reload)

        }
      })
      .catch(e => console.log(e))      
    })
    .catch(e => console.log("NONCE", e))
  }
  
  const showbtnDropIn = () => {
    return (
      <div>
        {
        info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance =>(info.instance = instance )}
            />
            <button onClick={onPurchase} className="btn btn-block btn-success">Buy Now</button>
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
