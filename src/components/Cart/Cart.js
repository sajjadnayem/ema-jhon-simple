import React  from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const auth = useAuth();
    // console.log(auth.user);
    //console.log(cart);
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    // const total = cart.reduce((total, prd) => total + prd.price, 0)
    let total = 0;
    for(let i =0; i< cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        debugger;
    } 
    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = Math.round(total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    const formatNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision)
   }
    return (
        <div>
            <h4>Order Summary</h4>
    <p>Items Ordered: {cart.length}</p>
    <p>product Price: {formatNumber(total)}</p>
    <p><small>Shipping cost: {shipping}</small></p>
    <p><small>Tax + vat:{tax}</small></p>
    <p>total price: {grandTotal}</p>
    <br/>
    {
        props.children
    }
    <p>{}</p>
    </div>
    );
};

export default Cart;