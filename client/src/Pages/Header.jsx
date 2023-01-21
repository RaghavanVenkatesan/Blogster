import React from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Header.style.css';

const Header = () => {
   const data = useSelector((state) => state.user);
   const { user } = data; 

//    console.log( user );

   return(
    <nav className="indigo container">
    <div className="nav-wrapper">
    <Link to={ !user ? '/': '/blogs'}
    className="left brand-logo"
    style={{ marginLeft: '10px' }}
    >
    Blogster
    </Link>
    <ul className="right">
    { !user ? (
        <li>
        <a href={'/auth/google'}>Login With Google</a>
        </li>
    ) : (
        <div className="blocks">
        <li key="3" style={{ margin: '0 60px' }}>
        <Link to="/blogs">My Blogs</Link>
        </li>

        <li key="2">
        <a href={'/auth/logout'}>Logout</a>
        </li>
        </div>
    )}
    </ul>
    </div>
    </nav>
   )
}

export default Header;