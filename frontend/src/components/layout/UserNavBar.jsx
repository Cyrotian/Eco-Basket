import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ecobasketlogo from "../../assets/ecobasketlogo.svg";
import "../css/navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import NotificationBell from "../notification/NotificationBell";  

function UserNavbar() {
    const [user, setUser] = useState(null);
    const [initials, setInitials] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);


          
            if (parsedUser.name) {
                const nameParts = parsedUser.name.split(" ");
                const userInitials =
                    nameParts.length > 1
                        ? nameParts[0][0] + nameParts[1][0]
                        : nameParts[0][0];

                setInitials(userInitials.toUpperCase());
            }
        }
    }, []);

    return (
        <div className="navbar-container">
            <div className="logo">
                <Link to="/">
                    <img src={ecobasketlogo} alt="EcoBasket Logo" />
                </Link>
            </div>

            <nav>
                <ul className="navlist">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/product-gallery">Marketplace</Link></li>
                    <li><Link to="/learning">eLearning</Link></li>
                    <li>
                        <button
                            className="cart-button"
                            onClick={() => navigate("/cart")}
                            title="Your Cart"
                        >
                            <FaShoppingCart className="cart-icon" />
                        </button>
                    </li>

                    {user && (
                        <li>
                            <NotificationBell />
                        </li>
                    )}

                    <li>
                        {user ? (
                            <button
                                className="user-icon"
                                onClick={() => navigate("/profile")}
                                title="Your Profile"
                            >
                                {initials}
                            </button>
                        ) : (
                            <Link to="/profile" className="Profile">Profile</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default UserNavbar;
