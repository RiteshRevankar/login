// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import DisplayUsers from './components/DisplayUsers';
import UserInfo from './components/UserInfo';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/users" element={<DisplayUsers />} />
        <Route exact path="/userinfo" element={<UserInfo />} /> {/* Add route for UserInfo component */}
      </Routes>
    </Router>
  );
};



export default App;
