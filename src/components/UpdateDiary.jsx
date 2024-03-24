import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import style from '../styles/createDiary.module.css'
const UpdateDiary = () => {
    const location = useLocation();
    const id=location.state.id;
    const [date,setDate]=useState();
    const [description,setDescription]=useState();
    const user=JSON.parse(localStorage.getItem('currentUser'))
    useEffect((e)=>{
        axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`)
    .then(response => {
        const userData = response.data;
        const diaryEntry = userData.diary.find(entry => entry.id === id);
        if (diaryEntry) {
            console.log(diaryEntry);
            setDate(diaryEntry.date)
            setDescription(diaryEntry.description)
        } else {
            console.log("Diary entry not found");
        }
    })
    .catch((err) => {
        alert(err);
    });
 },[])

 const updateDiary = () => {
    axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`)
        .then(response => {
            const userData = response.data;
            // Find the index of the diary entry with the given ID
            const diaryIndex = userData.diary.findIndex(entry => entry.id === id);
            if (diaryIndex !== -1) {
                // Update the diary entry with the new date and description
                userData.diary[diaryIndex].date = date;
                userData.diary[diaryIndex].description = description;
                
                // Send a PUT request to update the user's data
                return axios.put(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`, userData);
            } else {
                console.log("Diary entry not found");
                throw new Error("Diary entry not found");
            }
        })
        .then((res) => {
            console.log(res.data);
            alert("Diary entry has been updated");
            window.location.assign('/userHome')
            // Handle any further actions after updating
        })
        .catch((err) => {
            alert(err);
        });
};

const handleTextareaChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height to auto to recalculate scrollHeight
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to scrollHeight
}
  return (
    <div class={style.login}>
        <table class={style.form}>
            <tr><th colSpan={2}>Updated Form</th></tr><br />
            <tr><td>Date:</td><td><input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/></td></tr>
            <tr><td>Description:</td>
            <td><textarea class={style.in} value={description}onChange={(e) =>{setDescription(e.target.value);handleTextareaChange(e);}}rows={1} required/></td>
            </tr>
            <tr><th colSpan={2}><button onClick={updateDiary}>Update</button></th></tr>
        </table>
    </div>
  )
}

export default UpdateDiary