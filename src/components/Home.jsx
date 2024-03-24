import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/home.module.css'
const Home = () => {
  let [data,setData]=useState([]);
  let user=JSON.parse(localStorage.getItem("currentUser"));
  const [selectedDescription, setSelectedDescription] = useState(null);
  const navigate=useNavigate();
    useEffect(()=>{
      axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`)
      .then(response => {
           setData(response.data.diary);
          console.log(setData);
      })
      .catch((err) => {
          alert(err);
      });
  
    },[])

    const handleViewClick = (description) => {
      setSelectedDescription(description);
    }
    const deleteDiaryEntry = (diaryId) => {
      axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`)
          .then(response => {
              const userData = response.data;
              // Filter out the diary entry with the given ID
              userData.diary = userData.diary.filter(entry => entry.id !== diaryId);
              return axios.put(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`, userData);
          })
          .then((res) => {
              console.log(res.data);
              alert("Diary entry has been deleted");
              // Update local state or perform any further actions
          })
          .catch((err) => {
              alert(err);
          });
  };
  const logOut=()=>{
    localStorage.clear();
    navigate('/')
  }
  
  return (
    <div class={style.home}>
      <table class={style.form}>
        <tr><th>Date</th><th colSpan={3}>Description</th></tr>
        {data.map((e)=>
          (
            <tr>
              <td>{e.date}</td> 
              <td>
                  <button onClick={() => {navigate("/userHome/viewDiary",{replace:true,state:{date:e.date,description:e.description}})}}>View</button>
                  {selectedDescription === e.description && <p>{e.description}</p>}
              </td>
              <td><button onClick={() => deleteDiaryEntry(e.id)}>Delete</button></td>
              <td><button onClick={()=>{navigate("/userHome/updateDiary",{replace:true,state:{id:e.id}})}}>Update Diary</button></td>
            </tr>
            
          )
        )}
        <br />
        <tr><th colSpan={2}><button><Link to='/userHome/createDiary'>Add New Diary</Link></button></th> <th colSpan={4}><button onClick={logOut}>Log Out</button></th></tr>
      </table>
        
    </div>
  )
}

export default Home