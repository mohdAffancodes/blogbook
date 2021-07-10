//Hooks
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//Component
import { Helmet } from "react-helmet-async";
//CSS
import styles from "./notfound.module.css";

const NotFound = () => {
   let history = useHistory();

   useEffect(() => {
      setTimeout(() => {
         history.push("/");
      }, 2000);
   }, [history]);

   return (
      <div className={styles.notFound}>
         <Helmet>
            <title>404 | blogbook</title>
         </Helmet>
         <h2>Sorry</h2>
         <p>That page cannot be found</p>
         <Link to="/">Back to the homepage...</Link>
      </div>
   );
};

export default NotFound;
