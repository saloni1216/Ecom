import React, { useState, useEffect } from "react";
import { Base } from "./Base";
import Card from "./Card"
import { loadCart } from "./helper/cartHelper";
import { PaymentB } from "./PaymentB";



export const Cart = () => {

    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts = (products) => {
        return(
            <div>
               {products.map((product, index) => (
                <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                reload={reload}
                setReload={setReload}
                />
               ))}
            </div>
        )
    }


     const checkOutAllProducts = () => {
        return(
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }

    return(
        <Base title="Cart Page" description="Welcome to checkout">
            <div className="row text-center">
                <div className="col-5">
                    {products.length > 0 ? (loadAllProducts(products)) : (<h4>No products</h4>)}
                    </div>
                <div className="col-5">
                    {products.length > 0 ? (<PaymentB products={products} setReload={setReload}/>) : (<h4>Please login or add something in cart</h4>)} 
                    </div>

            </div>
        </Base>
    )

}