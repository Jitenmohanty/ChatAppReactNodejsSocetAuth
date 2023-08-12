import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login';
import './App.css';
import SetAvatar from "./Pages/SetAvatar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/setAvatar" element={<SetAvatar/>}/>
      </Routes>
    </Router>
  );
}

export default App;
