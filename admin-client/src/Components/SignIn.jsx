import { TextField,Button,Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignIn(){

    const navigate = useNavigate();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const handleSignIn = async ()=>{
        const response = await fetch('http://localhost:3000/user/signin',{
            method :'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({username , password})
        })

        const data = await response.json();

        if(data.token){
            localStorage.setItem("token" ,data.token);
            navigate('/actions');
        }else{
            alert('username does not found');
        }
    }
   return(
    <>
        <div className='flex justify-center items-center p-10 mb-40'>
            <Card className='flex flex-col w-fit justify-center items-center p-3 space-y-4 '>
                <h1 className='text-2xl font-bold'>Welcome to YuEdit</h1>
                <h1 className='text-xl font-semibold'>SignIn</h1>
                <TextField id="outlined-basic" label="Email" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} />
                <TextField id="outlined-basic" label="password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <Button variant="contained" onClick={handleSignIn}>Submit</Button>
            </Card>
        </div>
    </>
   )
}
export default SignIn ;