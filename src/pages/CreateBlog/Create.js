import React from "react";
//Hooks
import { useHistory } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
//Components
import SquareLoader from "../../components/loaders/squareLoader/SquareLoader";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import { Helmet } from "react-helmet-async";
//CSS
import "./create.css";
//db
import db from "../../api/firebase";
import AuthContext from "../../stores/authContext";
//checks
var filter = require("leo-profanity");

const Create = () => {
   const { user } = useContext(AuthContext);
   //console.log(user);
   const history = useHistory();
   //push to home if there is no user
   if (user === null) {
      history.push("/");
   }
   //.Data to send
   const [title, setTitle] = useState("");
   const [author, setAuthor] = useState(user.user_metadata.full_name);

   const [editable, setEditable] = useState(true); //Enable for QuillEditor
   const [isSending, setIsSending] = useState(false);

   useEffect(() => {
      let space = document.querySelector("#ql-space");
      space.style.setProperty("display", "block");

      return () => {
         space.style.setProperty("display", "none");
      };
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      let delta = window.quill.getContents();
      let options = delta.ops;
      //.console.log(options);
      let editor = document.querySelector(".ql-container").textContent;
      //.console.log(editor);
      if (
         checkForMedia(options) === false &&
         ((editor === "" && options[0].insert === "\n") || editor === "")
      ) {
         pleaseFillThis();
      } else if (filter.check(editor)) {
         thisIsProhibited();
      } else {
         setIsSending(true);
         setEditable(false);
         if (
            editor === "Please Fill this" ||
            editor === "This IS  Prohibited"
         ) {
            setIsSending(false);
            history.push("/");
         } else {
            sendData(delta);
         }
      }
   };

   function checkForMedia(options) {
      let media = false;

      function compareKeys(a, b) {
         let aKeys = Object.keys(a).sort();
         let bKeys = Object.keys(b).sort();
         return JSON.stringify(aKeys) === JSON.stringify(bKeys);
      }
      //.checking for img or vid
      for (let i = 0; i < options.length; i++) {
         if (
            compareKeys(options[i].insert, { video: "" }) ||
            compareKeys(options[i].insert, { image: "" })
         ) {
            media = true;
            //.console.log(media);
         }
      }
      return media;
   }

   function sendData(body) {
      db.collection(user.email)
         .add({
            createdAt: Date.now(),
            title,
            body: JSON.stringify(body),
            author,
         })
         .then(() => {
            setEditable(true);
            //console.log("New blog Added");
            setIsSending(false);
            history.push("/");
         });
   }

   function pleaseFillThis() {
      let pleaseFillThis = {
         ops: [
            {
               attributes: { size: "large", color: "#a10000", bold: true },
               insert: "Please Fill this",
            },
            { attributes: { align: "center", header: 1 }, insert: "\n" },
         ],
      };
      window.quill.setContents(pleaseFillThis);
   }

   function thisIsProhibited() {
      let thisIsProhibited = {
         ops: [
            {
               attributes: { size: "large", color: "#a10000", bold: true },
               insert: "This IS  Prohibited",
            },
            { attributes: { align: "center", header: 1 }, insert: "\n" },
         ],
      };
      window.quill.setContents(thisIsProhibited);
   }

   return (
      <div>
         <Helmet>
            <title>Create | blogbook</title>
         </Helmet>
         <div className="create">
            <h3 className="add">Add a new blog</h3>
            <form onSubmit={handleSubmit}>
               <label>Blog title:</label>
               <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                     if (!filter.check(e.target.value)) {
                        setTitle(e.target.value);
                     } else {
                        setTitle("");
                     }
                  }}
                  className="titleInput"
                  disabled={isSending}
                  maxLength="20"
               />
               <h6 style={{ position: "absolute", zIndex: "110" }}>
                  Blog body:
               </h6>
               <div id="ql-space"></div>
               <QuillEditor
                  id="ql-parent"
                  placeholder={"Compose an epic"}
                  enable={editable}
               />
               <label style={{ marginTop: "10px" }}>Blog author:</label>
               <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => {
                     if (!filter.check(e.target.value)) {
                        setAuthor(e.target.value);
                     } else {
                        setAuthor("");
                     }
                  }}
                  className="authorInput"
                  disabled={isSending}
                  maxLength="20"
               />
               {isSending ? (
                  <SquareLoader />
               ) : (
                  <button className="waves-effect waves-light addBlog">
                     Add Blog
                  </button>
               )}
            </form>
         </div>
      </div>
   );
};

export default Create;
