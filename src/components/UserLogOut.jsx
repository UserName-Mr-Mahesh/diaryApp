import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserLogOut = () => {
  const navigate = useNavigate();

  // Retrieve user data from local storage
  const userString = localStorage.getItem('currentUser');
  if (!userString) {
    // If currentUser is not found in localStorage, redirect to home page
    navigate("/", { replace: true });
    return null;
  }

  const user = JSON.parse(userString);

  // Clear user data from local storage
  localStorage.removeItem('currentUser');

  // Define the logout URL with the user's ID
  const logoutUrl = `https://65f6cf7bfec2708927c9c7af.mockapi.io/user/logout/${user.id}`;

  const logout = () => {
    axios.post(logoutUrl)
      .then(() => {
        navigate("/", { replace: true }); // Redirect to home page after successful logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/", { replace: true }); // Redirect to home page if logout fails
      });
  };

  logout(); // Call logout function when the component mounts

  return null; // Since this component only handles logout, it doesn't need to render anything
};

export default UserLogOut;
