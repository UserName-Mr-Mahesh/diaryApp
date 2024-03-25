import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from "../styles/login.module.css";
const Login = () => {
    const[email,setEmail]=useState("")
    const[psd,setPsd]=useState("")
    const navigate=useNavigate()

    const verify=(e)=>{
        e.preventDefault();
        axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user?email=${email}&psd=${psd}`)
        .then((response)=>{
        let vemail=response.data[0].email;
        let vpsd=response.data[0].psd;
        if(vemail===email && vpsd===psd){
            localStorage.setItem("currentUser",JSON.stringify(response.data[0]))
            navigate("/userHome")
        }
        })
        .catch(()=>{
        alert("Invalid User name or Password")
        })
        .catch(()=>{
        alert("Invalid user name")
        })
    }
    
  return (
    <div class={style.login}>
        <table class={style.form}>
            <tr><th colSpan={2}>User Login</th></tr><br />
            <tr><td>Email:</td><td><input type="text" placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/></td></tr><br />
            <tr><td>Password:</td><td><input type="password" placeholder='Enter Password' value={psd} onChange={(e)=>{setPsd(e.target.value)}}/></td></tr><br />
            <tr><th><button  onClick={verify}>Submit</button></th><th>click here to  <Link to="/register">Register</Link></th></tr>
        </table>
    </div>
  )
}

export default Login