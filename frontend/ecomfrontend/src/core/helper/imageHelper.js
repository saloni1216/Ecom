import React from "react";
export const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : `https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg`

    return(
        <div className="rounded border border-success p-2">
            <img 
            src={imageurl} 
            style={{maxHeight:"100%", maxWidth:"100%"}}
            className="mb-3 rounded"
            alt="tshirt"
            />
        </div>
    )

}