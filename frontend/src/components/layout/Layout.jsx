import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Footer from './Footer';
import UserNavbar from './UserNavBar.jsx';
import PublicNavbar from './PublicNavBar.jsx'
import "../css/layout.css";
import { useEffect, useState } from 'react';

const Layout = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const excludePaths = ["/registration", "/login","/information","/seller-registration","/","/home","/about-us","/explore"];
    const isExcluded = excludePaths.includes(location.pathname);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    
   
 
    useEffect(() => {
        if (!isExcluded) {
          
          const loggedIn = localStorage.getItem("isLoggedIn") === "true";
          setIsLoggedIn(loggedIn);
        }
      }, [location, isExcluded]); 

      const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userProfile");
        setIsLoggedIn(false);
        navigate("/login"); 
      };
    

    return (
        <div className="container">
              {isLoggedIn ? <UserNavbar onLogout={handleLogout} /> : <PublicNavbar/>}
            <main className="maincontent">
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;