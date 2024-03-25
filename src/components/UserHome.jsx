import React from 'react'
import Home from "./Home";
import CreateDiary from "./CreateDiary";
import UpdateDiary from "./UpdateDiary";
import View from "./View";
import style from '../styles/landing.module.css'
import Body from "./Body";
import { Route, Routes } from 'react-router-dom';

const UserHome = () => {
  return (
    <div class={style.landing}>
        <div>
            <Body class={style.body}/>
            <Routes class={style.login}>
                <Route path='/' element={<Home/>} />
                <Route path="/createDiary" element={<CreateDiary/>}/>
                <Route path="/updateDiary" element={<UpdateDiary/>}/>
                <Route path="/viewDiary" element={<View/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default UserHome