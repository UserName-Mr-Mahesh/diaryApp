import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../styles/login.module.css'
const Register = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[psd,setPsd]=useState("")
    const navigate=useNavigate()

    const reg=()=>{
        let payload={name,email,psd};
        if(name!=='' || email!=='' || psd!==''){
        axios.post(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user`,payload)
        .then(()=>{
            alert("Register Succeseful")
            console.log("Register Succeseful");
            navigate("/")
        })
        .catch((err)=>{
        alert(err);
        })
    }
    else{
        alert('Enter the required fields');
    }
    }
    
  return (
    <div class={style.login}>
        <table class={style.form}>
            <tr><th colSpan={2}><h1>User Register</h1></th></tr><br />
            <tr><td>Name</td><td>:<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required /></td></tr><br />
            <tr><td>Email</td><td>:<input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/></td></tr><br />
            <tr><td>Password</td><td>:<input type="password" value={psd} onChange={(e)=>{setPsd(e.target.value)}} required/></td></tr><br />
            <tr><td><button onClick={()=>navigate('/')}>Login</button></td><th colSpan={2}><button onClick={reg}>Register</button></th></tr>
        </table>
    </div>
  )
}

export default Register