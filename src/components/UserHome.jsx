import React from 'react'
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CreateDiary from "./CreateDiary";
import UpdateDiary from "./UpdateDiary";
import View from "./View";
import style from '../styles/landing.module.css'
import Body from "./Body";
import { Link, Route, Routes } from 'react-router-dom';
import UserLogOut from './UserLogOut';

const UserHome = () => {
  return (
    <div class={style.landing}>
        <div>
            <Body class={style.body}/>
            <Routes class={style.login}>
                <Route path='/' element={<Home/>}  />
                {/* <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/> */}
                <Route path="/createDiary" element={<CreateDiary/>}/>
                <Route path="/updateDiary" element={<UpdateDiary/>}/>
                <Route path="/viewDiary" element={<View/>}/>
                <Route path='/userLogOut' element={<UserLogOut/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default UserHome