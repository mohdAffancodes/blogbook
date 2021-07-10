import React, { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
   user: null,
   login: () => {},
   logout: () => {},
   signup: () => {},
   authReady: false,
});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [authReady, setAuthReady] = useState(false);

   useEffect(() => {
      netlifyIdentity.on("login", (user) => {
         setUser(user);
         netlifyIdentity.close();
         console.log("login event");
      });

      netlifyIdentity.on("logout", () => {
         setUser(null);
         console.log("logout event");
      });

      netlifyIdentity.on("init", (user) => {
         setUser(user);
         //.console.log(user);
         setAuthReady(true);
         console.log("init event");
      });

      netlifyIdentity.on("close", () => {
         document.querySelector(".nav-fixed").style.zIndex = 999;
      });

      netlifyIdentity.on("open", () => {
         document.querySelector(".nav-fixed").style.zIndex = 50;
      });

      // init netlify identity connection
      netlifyIdentity.init();

      return () => {
         netlifyIdentity.off("login");
         netlifyIdentity.off("logout");
         netlifyIdentity.off("close");
         netlifyIdentity.off("open");
      };
   }, []);

   const login = () => {
      netlifyIdentity.open();
   };

   const logout = () => {
      netlifyIdentity.logout();
   };

   const signup = () => {
      netlifyIdentity.open("signup");
   };

   const context = { user, login, logout, authReady, signup };

   return (
      <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
   );
};

export default AuthContext;
