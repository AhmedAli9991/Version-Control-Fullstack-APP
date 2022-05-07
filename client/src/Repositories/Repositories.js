import React, { useState,useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
export default function Repositories() {
const[Repos,setRepos]=useState([])
const [isOpen, setIsOpen] = useState(false);
const [Title, setTitle] = useState("");
const [Desc, setDesc] = useState("");
const [id, setid] = useState("");
const[update,setUpdate]=useState(false)
const navigate=useNavigate()
const togglePopup = () => {
  setIsOpen(!isOpen);
};
const handleCloseX =()=>{
  setTitle("");
  setDesc("");
  setUpdate(false)
  setIsOpen(false)
}

useEffect(()=>{
  getData()
},[])

const handleUpdate=async (id)=>{
  setUpdate(true)
  const  response = await axios.get(`http://localhost:4000/Repos/${id}`);
  const updating= await response.data
  setid(updating._id)
  setTitle(updating.Title)
  setDesc(updating.Desc)
  togglePopup()  
}
const AddRepo = async (e) => {
  e.preventDefault();
  if (Title != "" && Desc != "") 
  {
  if(update==true){
    await axios.put(`http://localhost:4000/Repos/${id}`, {
      Title,
      Desc
      });
    setTitle("");
    setDesc("");
    setUpdate(false)
    getData()
    togglePopup();
  }
  else{
     await axios.post("http://localhost:4000/Repos/add", {
      Title,
      Desc
      });
    setTitle("");
    setDesc("");
    setUpdate(false)
    getData()
    togglePopup();
    } 
  }
  else {
      alert("empty values");
    }
  }
const getData=async()=>{
  const response = await axios.get("http://localhost:4000/Repos/view")
  setRepos(response.data)

}
const Delete=async(id)=>{
  await axios.delete(`http://localhost:4000/Repos/${id}`)
  getData()
}

const Versions =(Repo)=>{ 
  navigate(`/${Repo.Title}`, { state: { Repo } })    
}

  return(
    <div class="container" style={{ height: 700, width: "100%", padding: 20 }}>

    <div class="col d-flex justify-content-end">
    <button
      class="btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
      type="button"
      id="cource-btn"
      onClick={togglePopup}
    >
      New Repository
    </button>
    {isOpen && (
            <Popup
              content={
                <>
                  <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                    Repository Detail
                  </h4>
                  <form onSubmit={AddRepo}>
                    <div class="row">
                      <div class="mb-3 col col-10">
                        <label for="course-code" class="form-label">
                          Repository name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="course-code"
                          value={Title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      </div>
                      <div class="mb-3 col col-10">
                        <label for="course-name" class="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="course-name"
                          value={Desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </div>

                    <input
                      type="submit"
                      name="submit"
                      value="Submit"
                      className=" btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
                    />
                  </form>
                </>
              }
              handleClose={handleCloseX}
            />
          )}

    </div>

    <table class="table" id="list">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>

        {Repos.map((Repo) => {
              return (
                <tr scope="row" key={Repo._id}> 
                  <td  onClick={()=>Versions(Repo)}>{Repo.Title}</td>
                  <td>{Repo.Desc}</td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>{handleUpdate(Repo._id)}}>Update</button>  
                  </td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>Delete(Repo._id)} >Delete</button>  
                  </td>
                </tr>
              );
            })}      
          </tbody>
      </table>
    </div>
    )

}

