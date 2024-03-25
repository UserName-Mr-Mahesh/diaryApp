import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../styles/createDiary.module.css'
const CreateDiary = () => {
    const [date,setDate]=useState();
    const [description,setDescription]=useState();
    const user=JSON.parse(localStorage.getItem("currentUser"));
    const navigate=useNavigate();

    const saveDiary = () => {
        const payload = { date, description };
        // Check if date and description are provided

        if (!date || !description) {
            alert("Please provide both date and description");
            return;
        }
    
        axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`)
            .then(response => {
                const userData = response.data;

                // Check if the provided date already exists
                const existingEntry = userData.diary.find(entry => entry.date === date);
                if (existingEntry) {
                    alert("A diary entry with the same date already exists");
                    return;
                }
                
                // Generate a unique ID for the new diary entry
                const newDiaryEntryId = userData.diary.length > 0 ? userData.diary[userData.diary.length - 1].id + 1 : 1;
    
                // Add the new diary entry with generated ID
                const newDiaryEntry = { id: newDiaryEntryId, ...payload };
                userData.diary.push(newDiaryEntry);
    
                // Update the user data with the modified diary array
                return axios.put(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`, userData);
            })
            .then((res) => {
                console.log(res.data);
                alert("Diary has been added");
                navigate("/home")
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
            <tr><td>Data:</td><td><input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} required/></td></tr>
            <tr><td>Description:</td></tr>
            <tr>
                <th colSpan={2}><textarea class={style.in} value={description}onChange={(e) =>{setDescription(e.target.value);handleTextareaChange(e);}}rows={1} required/></th>
            </tr>
            <tr><th colSpan={2}><button onClick={saveDiary}>Submit</button></th></tr>
        </table>
    </div>
  )
}

export default CreateDiary