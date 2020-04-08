import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const{productKey} = useParams()
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        fetch('https://safe-forest-04045.herokuapp.com/product/'+productKey)
        .then(res =>res.json())
        .then(data =>{
            setProduct(data);
        })
    },[productKey])
    return (
        <div>
            <h1>Your product details.</h1>
            {

               product && <Product showAddToCart={false} product ={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;