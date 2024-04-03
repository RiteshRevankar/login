import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5400/api/auth/logout');
            console.log("Logout Successful");
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.response ? error.response.data : error.message);
        }
    };


    if (!state) {
        console.error("No user data found in location state");
        return <div>No user data found.</div>;
    }

    const { name, email, mobile, role } = state;

    return (
        <div>
            <h2>User Information</h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Mobile: {mobile}</p>
            <p>Role: {role}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserInfo;
