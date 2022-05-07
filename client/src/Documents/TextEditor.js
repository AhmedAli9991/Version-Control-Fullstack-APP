import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"

import ReactQuill from 'react-quill';// or const { useQuill } = require('react-quilljs');
import axios from "axios"
import  "react-quill/dist/quill.snow.css";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme
import { useNavigate,useLocation } from "react-router-dom";

const  modules  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
};
export default () => {
  const {state} = useLocation();
  const navigate=useNavigate()
  const {_id, Title, Desc, User,Content} = state.Repo;
  const [savedText, setSavedText] = useState(Content);
  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post('http://localhost:4000/version/add',{
      Repository:_id,
      Content:savedText
    })
    navigate(`/${Title}`, { state: { Repo:state.Repo } })    

  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div  className="container">  
      <ReactQuill  modules={modules} theme="snow" value={savedText} onChange={(html)=>setSavedText(html)}  />
      </div>
      <input type='submit' name="submit" value="Commit" className="btn btn-primary button" />
    </form>
  );
};


