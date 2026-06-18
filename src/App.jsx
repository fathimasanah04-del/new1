import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { Routes,Route } from "react-router-dom"

function App() {


  return (
    <>
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Dashboard"element={<Dashboard/>}/>
    </Routes>

      
    </>
  )
}

export default App
