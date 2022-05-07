import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate
} from "react-router-dom"
import Navigation from "./Navigation"
import Login from "./Login Signup/Login"
import Register from "./Login Signup/Register"
import Repositories from "./Repositories/Repositories"
import TextEditor from "./Documents/TextEditor"
import Main from "./Documents/Main"

import { v4 as uuidV4 } from "uuid"

function App() {

  return (
    <Router>
       <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route  element={<Navigation />}>
          <Route path="/Dashboard" element={<Repositories/>}/>
          <Route path="/:Title" element={<Main />}/>
          <Route path="/Edit/:Title" element={<TextEditor />}/>
        </Route>
        <Route path="*"element={<Navigate to="/" />}/>
       </Routes>
    </Router>
  )
}

export default App
