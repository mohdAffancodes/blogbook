//hooks
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
//Components
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import { Helmet } from "react-helmet-async";
//checks
var filter = require("leo-profanity");

const DemoBlog = () => {
   const history = useHistory();
   const [editable, setEditable] = useState(false);

   const blog = JSON.stringify({
      ops: [
         {
            attributes: {
               bold: true,
            },
            insert:
               "This is the story of how 20 year old Guevara left Buenos Aires with a friend to explore South America for 9 months. They explore the Andes, the Amazon and the Atacama Desert and learn about the realities of life for communist revolutionaries, miners and indigenous families amongst others. This left him with a deep sense of the social injustice of Latin America and inspired his lifelong dream to try and improve things.",
         },
         {
            attributes: {
               header: 2,
            },
            insert: "\n\n",
         },
         {
            attributes: {
               bold: true,
               color: "#222222",
               link: "https://34fklg4e8k3932hmdl1qnbqu-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/motorcycle-diaries.jpg",
            },
            insert: {
               image: "https://34fklg4e8k3932hmdl1qnbqu-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/motorcycle-diaries-1140x641.jpg",
            },
         },
         {
            attributes: {
               header: 3,
            },
            insert: "\n",
         },
      ],
   });

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
         setEditable(true);
         return;
      }
      if (editIcon.textContent === "check") {
         hideToolbar();
         if (
            !filter.check(editorText) &&
            !filter.check(blogTitle.textContent)
         ) {
            setEditable(false);
            return;
         } else {
            alert("This Is Prohibited");
            history.push("/");
         }
         return;
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
         <Helmet>{blog && <title>Demo | blogbook</title>}</Helmet>
         <div className="blog-details">
            {blog && (
               <article>
                  <h2>
                     <span id="title">THE MOTORCYCLE DIARIES</span>
                  </h2>
                  <h6 style={{ marginBottom: "0 !important" }} id="author">
                     Written by <span>Ernesto 'Che' Guevara</span>
                  </h6>
                  <div id="ql-space"></div>
                  <QuillEditor id="blogBody" data={blog} enable={editable} />
               </article>
            )}
            <div className="floater">
               <i
                  className="material-icons editIcon"
                  onClick={editBlog}
                  style={{ fontSize: "30px" }}
               >
                  edit
               </i>
            </div>
         </div>
      </div>
   );
};

export default DemoBlog;
