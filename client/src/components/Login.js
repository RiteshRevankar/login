import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5400/api/auth/login', { email, password });
            const { accessToken, user } = res.data;
            console.log(user);
            // Check if user data is available
            if (!user) {
                console.error("No user data found");
                return;
            }

            // Check user role and navigate accordingly
            if (user.role === 'user') {
                navigate('/userinfo', { state: user });
            } else if (user.role === 'admin') {
                navigate('/users');
            } else {
                console.error("No user data found");
                return;
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>

            <h2>New user can register here</h2>
            <button onClick={() => navigate('/register')}>Register</button>
        </div >
    );
};

export default Login;
