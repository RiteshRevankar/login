import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [updateUserData, setUpdateUserData] = useState({});
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5400/api/auth/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error.response ? error.response.data : error.message);
            }
        };
        getUsers();
    }, []);

    const handleUpdate = (userData) => {
        setSelectedUser(userData);
        setUpdateUserData(userData);
        console.log(userData)// Set initial state to user's current data
        setIsUpdateDialogOpen(true);
    };


    const handleUpdateConfirm = async () => {
        try {
            await axios.put(`http://localhost:5400/api/auth/users/${selectedUser._id}`, updateUserData);
            // Refresh user data after update
            const res = await axios.get('http://localhost:5400/api/auth/users');
            setUsers(res.data);
            setIsUpdateDialogOpen(false);
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = (userData) => {
        setSelectedUser(userData);
        console.log(userData)
        setIsConfirmDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5400/api/auth/users/${selectedUser._id}`);
            // Filter out the deleted user from the user list
            setUsers(prevUsers => prevUsers.filter(user => user._id !== selectedUser._id));
            setIsConfirmDialogOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5400/api/auth/logout');
            console.log('Logout Successful');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Mobile: {user.mobile}</p>
                        <p>Role: {user.role}</p>
                        <button onClick={() => handleUpdate(user)}>Update User</button>
                        <button onClick={() => handleDelete(user)}>Delete User</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>

            {/* Update User Dialog */}
            {isUpdateDialogOpen && (
                <div>
                    <h3>Update User</h3>
                    <input
                        type="text"
                        placeholder="New Name"
                        value={updateUserData.name || ''}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="New Email"
                        value={updateUserData.email || ''}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="New Mobile"
                        value={updateUserData.mobile || ''}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, mobile: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="New Role"
                        value={updateUserData.role || ''}
                        onChange={(e) => setUpdateUserData({ ...updateUserData, role: e.target.value })}
                    />
                    <button onClick={handleUpdateConfirm}>Confirm</button>
                </div>
            )}

            {/* Delete User Confirm Dialog */}
            {isConfirmDialogOpen && (
                <div>
                    <h3>Confirm Deletion</h3>
                    <p>Are you sure you want to delete this user {selectedUser.name}?</p>
                    <button onClick={handleDeleteConfirm}>Yes</button>
                    <button onClick={() => setIsConfirmDialogOpen(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default DisplayUsers;
