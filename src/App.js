import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";
import CreateDiary from "./components/CreateDiary";
import UpdateDiary from "./components/UpdateDiary";
import View from "./components/View";
import UserHome from "./components/UserHome";
import UserLogOut from "./components/UserLogOut";
// import Body from "./components/Body";
function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}  />
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/createDiary" element={<CreateDiary/>}/>
      <Route path="/updateDiary" element={<UpdateDiary/>}/>
      <Route path="/viewDiary" element={<View/>}/>
      <Route path="/userHome/*" element={<UserHome/>}/>
      <Route path='/userLogOut' element={<UserLogOut/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
