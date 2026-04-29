import { useEffect, useState } from "react";
import { getProducts } from "./helper/coreapicalls";
import { Base } from "./Base";
import "../styles.css";
import Card from "./Card";

export const Home = () => {
    const[products, setProducts] = useState([])
    const[error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts()
        .then((data) => {
            if(data.error){
                setError(data.error);
                console.log(error);
            }else{
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProduct();
    }, []);

    return(
        <Base title="Home Page" description="Welcome To Tshirt Store">
            <h1>Home Component</h1>
            <div className="row">
                {products.map((product, index) =>{
                    return(
                        <div key={index} className="col-3 mb-4">
                          <Card product = {product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}