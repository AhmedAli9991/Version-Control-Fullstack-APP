import React, { useState,useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate,useLocation } from "react-router-dom";

export default function Main() {

const {state} = useLocation();
const {_id, Title, Desc, User} = state.Repo;
const [Version,setVersion] = useState([])
const [isOpen, setIsOpen] = useState(false);
const [Content, setContent] = useState("<h3> This Repository is Currently Empty ... </h3>");
const navigate=useNavigate()
const togglePopup = () => {
  setIsOpen(!isOpen);
};
const handleCloseX =()=>{
  setIsOpen(false)
}

useEffect(()=>{
  getData()
},[])

const getData=async()=>{
console.log(_id)
  const response = await axios.get(`http://localhost:4000/version/all/${state.Repo._id}`)
  setVersion(response.data)
  if(response.data.length>0){
  getContent(response.data)}
}
const getContent=async(array)=>{
    const obj = array[array.length - 1] 
    const response = await axios.get(`http://localhost:4000/version/${obj._id}`)
    console.log(response.data)
    setContent(response.data.Content)
  }
  const Edit =()=>{ 
    state.Repo.Content = Content
    navigate(`/Edit/${state.Repo.Title}`, { state: { Repo:state.Repo } })    
  }  
const getCon = async(id)=>{
    const response = await axios.get(`http://localhost:4000/version/${id}`)
    setContent(response.data.Content)
  
} 
  return(
    <div className="container" style={{ height: 700, width: "100%", padding: 20 }}>

    <div className="col d-flex justify-content-end">
    <button
      class="btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
      type="button"
      id="cource-btn"
      onClick={togglePopup}
    >
        Versions
    </button>
    <button
      class="btn btn-primary "
      style={{width:70}}
      type="button"
      id="cource-btn"
      onClick={Edit}
    >
        Edit
    </button>
    </div>

    {isOpen && (
            <Popup
              content={
                <>
                  <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                    Versionitory Detail
                  </h4>
                  <table class="table" id="list">
        <thead>
          <tr>
            <th scope="col">Version</th>
          </tr>
        </thead>
        <tbody>

        {Version.map((Repo,index) => {
              return (
                <tr scope="row" key={Repo._id}> 
                  <td onClick={()=>getCon(Repo._id)}>Version: {index+1}</td>
                  <td>{Repo.Desc}</td>
                </tr>
              );
            })}      
          </tbody>
      </table>
                </>
              }
              handleClose={handleCloseX}
            />
          )}
          <div dangerouslySetInnerHTML={{__html: Content}}>
        
        </div>
    </div>
    )

}

