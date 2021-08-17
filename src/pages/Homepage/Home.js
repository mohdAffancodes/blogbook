import React from "react";
//Components
import LinearLoader from "../../components/loaders/LinearLoader";
import { Helmet } from "react-helmet-async";
import BlogList from "./BlogList";
import LandingPage from "./LandingPage/LandingPage";
//hooks
import { useContext } from "react";
import { DataContext } from "../../stores/dataContext";
import AuthContext from "../../stores/authContext";

const Home = () => {
   const { user, login, authReady, signup } = useContext(AuthContext);
   const { data, status, error } = useContext(DataContext);
   //.console.log(data);
   return (
      <div>
         <Helmet>
            <title>{user ? "Home" : "Land"} | blogbook</title>
         </Helmet>
         {authReady && (
            <div className="home">
               {user ? (
                  <div>
                     {status === "error" && (
                        <div style={{ fontSize: "20px", fontWeight: "700" }}>
                           {error.message}
                        </div>
                     )}
                     {status === "loading" && (
                        <div style={{ marginTop: "30px" }}>
                           <LinearLoader />
                        </div>
                     )}
                     {status === "success" && <BlogList blogs={data} />}
                  </div>
               ) : (
                  <LandingPage login={login} signup={signup} />
               )}
            </div>
         )}
      </div>
   );
};

export default Home;
