import React from 'react';
import logo from '../images/logo.png';
import './Header.css';
import { useAuth } from './Login/useAuth';
const   Header = () => {
    const auth = useAuth();
    return (
        <div className="Header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/Shop">Shop</a>
                <a href="/review">Order review</a>
                <a href="/inventory">Inventory</a>
                {
                    auth.user && <span style={{color:'yellow'}}>Welcome{auth.user.name}</span>  
                }
                {
                    auth.user ?  <a href="/login">Sign Out</a>
                    : <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header; 