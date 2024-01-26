import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
function Navbar(){
  const navigate = useNavigate();
  return(
    <>
      <div className="flex justify-between align-center p-4">
        <h1 className="text-4xl font-extrabold">Todou</h1>
        <div className="flex gap-3 ">
        <button className="bg-blue-500 text-white px-2 sm:px-6 py-3 rounded" onClick={
            ()=>{
                navigate('/signup');
            }
          }>Sign Up</button>
          <button className="bg-blue-500 text-white px-2 sm:px-6 py-3 rounded" onClick={
            ()=>{
                navigate('/signin');
            }
          }>Sign In</button>
        </div>
      </div>
    </>
  )
}

export default Navbar ;