import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = ({ login, signup }) => {
   return (
      <div>
         <div className="landingPage">
            <div className="headerContainer">
               <h4 className="Header">
                  Create <span>Simply Amazing</span> blogs with our intuitive
                  editor based on <span><a href="https://quilljs.com/">Quilljs</a></span> technology
               </h4>
            </div>

            <div className="parentBtnContainer hide-on-small-only">
               <div className="btnContainers">
                  <a
                     href="#signup"
                     className="myTabs waves-effect waves-light btn white-text landingPageBtns signup"
                     onClick={signup}
                  >
                     Signup
                  </a>
               </div>
               <div className="btnContainers">
                  <a
                     href="#login"
                     className="myTabs waves-effect waves-light btn white-text landingPageBtns"
                     style={{
                        backgroundColor: "transparent",
                        border: "2px solid #f1356d"
                     }}
                     onClick={login}
                  >
                     Login
                  </a>
               </div>
            </div>
         </div>

         <div className="blogContainer">
            <h5
               className="center-align hide-on-small-only"
               style={{ fontWeight: "600" }}
            >
               Try it by editing this demo blog
            </h5>
            <h5 className="hide-on-med-and-up" style={{ fontWeight: "450" }}>
               Try it out
            </h5>
            <Link to="demo">
               <div className="blog-preview">
                  <h2>THE MOTORCYCLE DIARIES</h2>
                  <p style={{ fontWeight: "600" }}>
                     Written by Ernesto ‘CHE’ Guevara
                  </p>
               </div>
            </Link>
         </div>

         <div className="footer">
            Created By{" "}
            <a href="https://github.com/mohdAffancodes">&copy;mohdAffancodes</a>
         </div>
      </div>
   );
};

export default LandingPage;
