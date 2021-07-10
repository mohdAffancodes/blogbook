import { Link } from "react-router-dom";
//Context
import React, { useContext } from "react";
import AuthContext from "../../stores/authContext";
//CSS
import "./navbar.css";
//Components
import Logo from "./logo.png";

const Navbar = () => {
   const { user, logout, login, authReady } = useContext(AuthContext);

   return (
      <section id="nav">
         <div className="navSpace"></div>
         <nav className="nav-fixed">
            <div className="nav-wrapper">
               <Link to="/" className="brandLogo">
                  <img src={Logo} alt="Logo" height="85%" />
                  {!user && 
                     <span className="hide-on-small-only">
                        logbook
                     </span>
                  }
               </Link>
               {authReady && (
                  <ul id="nav-logout" className="right">
                     <li>
                        <Link to="/" className="myTabs navIcons">
                           <i
                              className="material-icons"
                              style={{
                                 fontSize: "30px",
                              }}
                           >
                              home
                           </i>
                           <span className="hide-on-small-only">Home</span>
                        </Link>
                     </li>
                     <li
                        className={`logoutBtn ${!user && "hide-on-med-and-up"}`}
                     >
                        <Link
                           to="/"
                           className="myTabs waves-effect waves-light btn white-text"
                           onClick={() => {
                              return user ? logout() : login();
                           }}
                        >
                           {user ? "Logout/Signout" : "Login/Signup"}
                        </Link>
                     </li>
                  </ul>
               )}
            </div>
         </nav>
      </section>
   );
};

export default Navbar;
