import React, { createContext, useContext } from "react";
import { useFirestoreQuery } from "../api/useFirestoreQuery";
import AuthContext from "./authContext";

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
   const { user } = useContext(AuthContext);

   let collection = "blog1";
   if (user) {
      collection = user.email;
   }

   const { state, change } = useFirestoreQuery(collection);
   const { data, status, error } = state;
   const context = { data, status, error, change };

   return (
      <DataContext.Provider value={context}>{children}</DataContext.Provider>
   );
}
