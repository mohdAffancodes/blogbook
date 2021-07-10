import React, { StrictMode } from "react";
import { render } from "react-dom";
//Stylesheets
import "materialize-css/dist/css/materialize.min.css";
import "./index.css";
//App component
import App from "./App";
//Providers
import { HelmetProvider } from "react-helmet-async";
import DataProvider from "./stores/dataContext";
import { AuthProvider } from "./stores/authContext";

const Provider = () => {
   return (
      <HelmetProvider>
         <AuthProvider>
            <DataProvider>
               <App />
            </DataProvider>
         </AuthProvider>
      </HelmetProvider>
   );
};

render(
   <StrictMode>
      <Provider />
   </StrictMode>,
   document.getElementById("root")
);
