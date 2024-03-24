import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import style from '../styles/createDiary.module.css'

const View = () => {
    const location=useLocation();
    const date=location.state.date;
    const description=location.state.description;
    const navigate =useNavigate()
  return (
    <div class={style.login}>
        <table class={style.form}>
            <tr><td>Data:</td><td><input type="" value={date}/></td></tr>
            <tr><td>Description:</td>
                <td><textarea class={style.in} value={description}/></td>
            </tr>
            <tr><th colSpan={2}><button onClick={()=>{navigate('/userHome')}}>Menu</button></th></tr>
        </table>
    </div>
  )
}

export default View