"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/profilepage.css";

function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch user data from the database upon component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://13.234.238.29:3001/api/Users"
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = () => {
    // Enable edit mode
    setIsEditMode(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the userData state with the new value
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Update user data in the database
      const response = await axios.put(
        "http://13.234.238.29:3001/api/Users",
        userData
      );
      console.log("Data updated:", response.data);
      // Disable edit mode after submission
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputFirstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            disabled={!isEditMode} // Disable input field if not in edit mode
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            disabled={!isEditMode} // Disable input field if not in edit mode
          />
        </div>
        {/* Add more input fields as needed */}
        <button type="button" onClick={handleEdit} className="btn btn-primary">
          Edit
        </button>
        {isEditMode && (
          <button type="submit" className="btn btn-success">
            Save
          </button>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
