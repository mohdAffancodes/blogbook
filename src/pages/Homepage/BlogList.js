import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
//CSS
import "./blogList.css";

const BlogList = ({ blogs }) => {
   const [searchQuery, setSearchQuery] = useState("");
   const [search, setSearch] = useState(false);

   const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

   return (
      <div className="blog-list row">
         {blogs.length === 0 && (
            <div>
               <h3>No blogs</h3>
               <h4>
                  <Link to="/create">Create One Now</Link>
               </h4>
            </div>
         )}
         {blogs.length > 0 && (
            <h3>
               <i
                  className="material-icons searchIcon"
                  onClick={() => {
                     setSearch((prevState) => {
                        return !prevState;
                     });
                     setSearchQuery("");
                  }}
               >
                  search
               </i>
               {!search && "Your blogs"}
               {search && (
                  <input
                     placeholder="Search by title"
                     type="search"
                     value={searchQuery}
                     onChange={(e) => {
                        setSearchQuery(e.target.value);
                     }}
                     className="search-blog"
                  />
               )}
               <Link
                  to="/create"
                  style={{
                     backgroundColor: "#f1356d",
                  }}
                  className="myTabs waves-effect waves-circle waves-light btn white-text newfloater"
               >
                  <i
                     className="material-icons"
                     style={{
                        fontSize: "40px",
                     }}
                  >
                     add
                  </i>
               </Link>
            </h3>
         )}
         {blogs
            .filter((blog) =>
               blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((blog) => {
               return (
                  <Link
                     to={`/blogs/${blog.id}`}
                     key={blog.id}
                     className={
                        !search &&
                        !isMobile &&
                        blogs.length % 2 === 0 &&
                        blogs.length > 5
                           ? "col l6 s12 m6"
                           : ""
                     }
                  >
                     <div
                        className="blog-preview"
                        style={{
                           margin:
                              !search &&
                              !isMobile &&
                              blogs.length % 2 === 0 &&
                              blogs.length > 5
                                 ? "10px 0"
                                 : "20px 0",
                        }}
                     >
                        <h2>{blog.title}</h2>
                        <p style={{ fontWeight: "600" }}>
                           Written by {blog.author}
                        </p>
                     </div>
                  </Link>
               );
            })}
      </div>
   );
};

export default BlogList;
