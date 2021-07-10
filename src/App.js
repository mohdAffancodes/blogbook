import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Components
import Home from "./pages/Homepage/Home";
import Navbar from "./components/navbar/Navbar";
import Create from "./pages/CreateBlog/Create";
import NotFound from "./pages/NotFound/NotFound";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import DemoBlog from "./pages/BlogDetails/demoBlog";

function App() {
   return (
      <Router>
         <div className="App">
            <Navbar />
            <div className="content">
               <Switch>
                  <Route exact path="/">
                     <Home />
                  </Route>
                  <Route exact path="/blogs/:id">
                     <BlogDetails />
                  </Route>
                  <Route exact path="/create">
                     <Create />
                  </Route>
                  <Route exact path="/demo">
                     <DemoBlog />
                  </Route>
                  <Route path="*">
                     <NotFound />
                  </Route>
               </Switch>
            </div>
         </div>
      </Router>
   );
}

export default App;
