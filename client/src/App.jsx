import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Login, Signup, Chat } from './pages';


const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App