import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/home.module.css'              
const Home = () => {
  let [data,setData]=useState([]);
  let user=JSON.parse(localStorage.getItem("currentUser"));
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to keep track of item to delete
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control modal visibility
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

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
    const handleDeleteConfirmation = (itemId) => {
      setDeleteItemId(itemId);
      setShowConfirmation(true);
    }

    const handleDelete = () => {
      axios.get(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`)
          .then(response => {
              const userData = response.data;
              // Filter out the diary entry with the given ID
              userData.diary = userData.diary.filter(entry => entry.id !== deleteItemId);
              return axios.put(`https://65f6cf7bfec2708927c9c7af.mockapi.io/user/${user.id}`, userData);
          })
          .then((res) => {
              console.log(res.data);
              // alert("Diary entry has been deleted");
              setShowConfirmation(false); // Hide confirmation modal
              window.location.assign('/userHome');
          })
          .catch((err) => {
              alert(err);
          });
  };
  
  const handleLogoutConfirmation = () => {
    setShowLogoutConfirmation(true);
  };

  const logOut=()=>{
    localStorage.clear();
    navigate('/')
  }
  
  return (
    <div class={style.home}>
      <table class={style.form}>
        <tr><th><h2> Date</h2></th><th colSpan={3}><h2>Description</h2></th></tr>
        {data.map((e)=>
          (
            <tr>
              <td><b>{e.date}</b></td> 
              <td>
                  <button onClick={() => {navigate("/userHome/viewDiary",{replace:true,state:{date:e.date,description:e.description}})}}>View</button>
                  {selectedDescription === e.description && <p>{e.description}</p>}
              </td>
              <td><button onClick={() => handleDeleteConfirmation(e.id)}>Delete</button></td>
              <td><button onClick={()=>{navigate("/userHome/updateDiary",{replace:true,state:{id:e.id}})}}>Update Diary</button></td>
            </tr>
            
          )
        )}
        <br />
        <tr><th colSpan={2}><button class={style.add}><Link to='/userHome/createDiary'>Add New Diary</Link></button></th> <th colSpan={4}><button onClick={handleLogoutConfirmation} class={style.logout}>Log Out</button></th></tr>
      </table>
        {/* Confirmation Modal */}
      {showConfirmation &&
        <div className={style.confirmationModal}>
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      }
      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className={style.confirmationModal}>
          <p>Are you sure you want to log out?</p>
          <button onClick={logOut}>Yes</button>
          <button onClick={() => setShowLogoutConfirmation(false)}>No</button>
        </div>
      )}

    </div>
  )
}

export default Home