import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp(){
    const navigate = useNavigate();

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const handleSignup = async()=>{
        const response = await fetch('http://localhost:3000/user/signup',{
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body : JSON.stringify({username , password})
        });

        const data = await response.json();
        if(data.token) {
          localStorage.setItem("token",data.token);
          navigate('/actions');
        }else{
          alert("error while signing up");
        }
    };

    return(
        <>
          <div className='flex justify-center items-center p-10 '>
            <Card className='flex flex-col w-fit justify-center items-center p-3 space-y-4 '>
                <h1 className='text-2xl font-bold'>Welcome to YuEdit</h1>
                <h1 className='text-xl font-semibold'>SignUp</h1>

                <TextField id="outlined-basic" label="Email" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)}/>

                <TextField id="outlined-basic" label="password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} />
                
                <Button variant="contained" onClick={handleSignup}>Submit</Button>

                <h1>or</h1>
                <div>already have an account <Button variant='contained' onClick={()=>{
                  navigate('/signin')
                }}>LogIN</Button></div>

            </Card>
          </div>
        </>
    )
}

export default SignUp ;