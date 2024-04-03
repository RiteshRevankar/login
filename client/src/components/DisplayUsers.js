import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5400/api/auth/logout');
            console.log("Logout Successful");
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5400/api/auth/users');
                setUsers(res.data);
                console.log(res.data)
            } catch (error) {
                console.error(error.response.data);
            }
        };
        getUsers();
    }, []);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Mobile: {user.mobile}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DisplayUsers;
