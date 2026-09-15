import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/css/authPages.css";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

    const validateForm = () => {
        if (!email.current?.value || !password.current?.value) {
            alert("Please fill in both fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:8080/api/login", {
                    email: email.current.value,
                    password: password.current.value,
                
                });
                

                if (response.status === 200) {
                    const user = response.data; 
                    const userID = BigInt(response.data.userId);
                    localStorage.setItem("userid", userID);
                    localStorage.setItem("isLoggedIn", "true");

                    let profile = {
                     
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        shippingAddress: user.shippingAddress,
                        userType: user.userType,
                    };
                    localStorage.setItem("userProfile", JSON.stringify(profile));

                    if (user.userType === "SELLER" || user.userType === "BULK_SELLER") {
                        
                        
                        const sellerID = response.data.sellerId;
                        localStorage.setItem("SellerId", (sellerID));

                        console.log(sellerID);
                       
                      
                        navigate("/product-details");

                    } else {
                    
                        navigate("/product-gallery");
                        
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setErrorMessage("Invalid credentials. Please try again.");
                } else {
                    setErrorMessage("An error occurred. Please try again later.");
                }
            }
        }
    };

    return (
        <div className="auth">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h2 className="formTitle">Welcome Back</h2>
                <p className="formSubtitle">Log in to access your account.</p>

                <div className="form-group">
                    <label className="labelText">Email:</label>
                    <input
                        type="email"
                        className="inputText"
                        ref={email}
                        name="email"
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="form-group">
                    <label className="labelText">Password:</label>
                    <input
                        type="password"
                        className="inputText"
                        ref={password}
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit">Log In</button>
                <p className="formFooter">
                    Don’t have an account? <a href="/Registration">Sign Up</a>
                </p>
            </form>
        </div>
    );
}
