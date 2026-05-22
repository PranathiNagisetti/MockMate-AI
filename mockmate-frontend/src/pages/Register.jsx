import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar"
function Register(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const register = async ()=>{

try{

await API.post("/auth/register",{
email,
password
})

navigate("/")

}catch(err){

alert("Register failed")

}

}

return(

<div>

<h2>Register</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button onClick={register}>Register</button>

</div>

)

}

export default Register