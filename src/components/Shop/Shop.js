import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4200/products')
        .then(res =>res.json())
        .then(data =>{
            console.log('data from database', data);
            setProducts(data);
            //console.log(products)
        })
    }, [])



    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        console.log(products);
        if(products.length>0){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
    
            })
            setCart(previousCart);
        }
        
    }, [products])
      
    const handleAddProduct = (product) =>{
        const ToBeAddedKey = product.key;
        const sameProduct = cart.filter(pd=>pd.key === ToBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
             count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== ToBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        

        setCart(newCart);
        
        addToDatabaseCart(product.key, 1);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                products.map(pd => <Product 
                    key={pd.key}
                    showAddToCart ={true}
                    handleAddProduct = {handleAddProduct}
                    product={pd}
                    ></Product>)
            }  
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to ="/review">
                    <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
             
        </div>
    );
};

export default Shop;