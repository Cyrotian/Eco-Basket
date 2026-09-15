import React from "react";
import { Link } from "react-router-dom";
import ecobasketlogo from "../../assets/ecobasketlogo.svg";
import "../css/navbar.css";

function PublicNavbar() {
    return (
        <div className="navbar-container">
            <div className="logo">
                <a href="/">
                <img src={ecobasketlogo} alt="EcoBasket Logo" />
                </a>
            </div>
            <nav>
                <ul className="navlist">
                        
                       <li><Link to="information" className="Learn">Learn</Link> </li>
                        <li><Link to="registration" className="sign-up">Sign up</Link></li>
                        <li><Link to="login" className="sign-in">Sign in</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default PublicNavbar;
