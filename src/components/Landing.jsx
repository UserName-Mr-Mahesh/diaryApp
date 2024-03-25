import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "./Login";
import style from '../styles/landing.module.css'
import Body from "./Body";
import Register from './Register';
const Landing = () => {
  return (
    <div class={style.landing}>
      <div>
        <Body class={style.body}/>
        <Routes class={style.login}>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> 
        </Routes>
      </div>
    </div>
  )
}

export default Landing