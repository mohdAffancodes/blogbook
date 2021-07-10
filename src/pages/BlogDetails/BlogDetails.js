//Hooks
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext, useReducer } from "react";
//Components
import LinearLoader from "../../components/loaders/LinearLoader";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import { Helmet } from "react-helmet-async";
//CSS
import "./blogDetails.css";
//db
import db from "../../api/firebase";
import { DataContext } from "../../stores/dataContext";
import AuthContext from "../../stores/authContext";
//checks
var filter = require("leo-profanity");

const reducer = (state, action) => {
   switch (action.type) {
      case "save":
         return {
            editable: false,
            initialLoad: true,
            updating: true,
            deleting: false,
         };
      case "updated":
         return {
            editable: false,
            initialLoad: true,
            updating: false,
            deleting: false,
         };
      case "delete":
         return {
            editable: false,
            initialLoad: true,
            updating: false,
            deleting: true,
         };
      case "initial":
         return {
            editable: false,
            initialLoad: true,
            updating: false,
            deleting: false,
         };
      case "edit":
         return {
            editable: true,
            initialLoad: true,
            updating: false,
            deleting: false,
         };
      default:
         return state;
   }
};

const BlogDetails = () => {
   const { id } = useParams();
   const history = useHistory();
   const { user } = useContext(AuthContext);
   //.If the user is not there push to home
   if (user === null) {
      history.push("/");
   }

   const [blog, setBlog] = useState(null);

   const initialState = {
      editable: false,
      initialLoad: false,
      updating: false,
      deleting: false,
   };

   const [{ editable, initialLoad, updating, deleting }, dispatch] = useReducer(
      reducer,
      initialState
   );

   //.Using Context
   const { data, status, error, change } = useContext(DataContext);
   const snapshot = change[0];
   const doc = change[1];

   useEffect(() => {
      if (deleting === false) {
         if (!initialLoad) {
            setBlog(data.filter((data) => data.id === id)[0]);
         }
         if (blog && doc === blog.id) {
            if (snapshot === "modified") {
               //.Re-render the blog only if blog is modified
               setBlog(data.filter((data) => data.id === id)[0]);
            } else if (snapshot === "removed") {
               //.If the blog is deleted elsewhere redirect to home
               history.push("/");
            }
         }
      }
   }, [data, id, initialLoad, snapshot, doc, deleting, history, blog]);

   useEffect(() => {
      dispatch({ type: "initial" });
   }, []);

   const deleteBlog = () => {
      dispatch({ type: "delete" });
      //.deleting the blog in the database
      db.collection(user.email)
         .doc(blog.id)
         .delete()
         .then(() => {
            history.push("/");
         });
   };

   const editBlog = (e) => {
      e = e || window.event;
      let editIcon = e.target || e.srcElement;
      //.elements to be edited
      let blogTitle = document.querySelector("#title");
      let toolbar = document.querySelector("#blogBody .ql-toolbar");
      let space = document.querySelector("#ql-space");
      let editorText = document.querySelector(
         "#blogBody .ql-container"
      ).textContent;

      if (editIcon.textContent === "edit") {
         showToolbar();
         dispatch({ type: "edit" });
         return;
      }
      if (editIcon.textContent === "check") {
         hideToolbar();
         if (
            !filter.check(editorText) &&
            !filter.check(blogTitle.textContent)
         ) {
            dispatch({ type: "save" });
            if (user) return sendData();
         } else {
            alert("This Is Prohibited");
            history.push("/");
         }
         return;
      }

      function sendData() {
         //.Getting editor contents
         let body = JSON.stringify(window.quill.getContents());

         db.collection(user.email)
            .doc(blog.id)
            .update({
               body,
               title: blogTitle.textContent,
            })
            .then(() => {
               dispatch({ type: "updated" });
            });
      }

      function showToolbar() {
         blogTitle.contentEditable = true;
         editIcon.textContent = "check";
         //.make toolbar visible
         toolbar.style.visibility = "visible";
         toolbar.style.setProperty("height", "initial");
         space.style.setProperty("display", "block");
      }

      function hideToolbar() {
         blogTitle.contentEditable = true;
         editIcon.textContent = "edit";
         //.hide toolbar
         toolbar.style.visibility = "hidden";
         toolbar.style.height = "0px";
         space.style.setProperty("display", "none");
      }
   };

   return (
      <div>
         <Helmet>{blog && <title>{blog.title} | blogbook</title>}</Helmet>
         <div className="blog-details">
            {updating && <h2>Saving Changes</h2>}
            {(updating || status === "loading") && <LinearLoader />}
            {error && (
               <div style={{ fontSize: "20px", fontWeight: "700" }}>
                  {error}
               </div>
            )}
            {blog && !updating && (
               <article>
                  <h2>
                     <span id="title">{blog.title}</span>
                     <i
                        className="material-icons right deleteIcon"
                        style={{
                           cursor: "pointer",
                           fontSize: "40px",
                        }}
                        onClick={deleteBlog}
                     >
                        delete
                     </i>
                  </h2>
                  <h6 style={{ marginBottom: "0 !important" }} id="author">
                     Written by <span>{blog.author}</span>
                  </h6>
                  <div id="ql-space"></div>
                  <QuillEditor
                     id="blogBody"
                     data={blog.body}
                     enable={editable}
                  />
               </article>
            )}
            {status === "success" && !updating && (
               <div className="floater">
                  <i
                     className="material-icons editIcon"
                     onClick={editBlog}
                     style={{ fontSize: "30px" }}
                  >
                     edit
                  </i>
               </div>
            )}
         </div>
      </div>
   );
};

export default BlogDetails;
