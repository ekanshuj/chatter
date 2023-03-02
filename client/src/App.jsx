import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Home, Signin, Signup, Chat } from './pages';

const DIVISION = styled.div`
@media(max-width: 1024px) {
  display: none;
}`;

const SECTION = styled.section`
@media(min-width: 1024px) {
  display: none;
}`;

const App = () => {
  return (
    <>
      <DIVISION className='app'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </DIVISION>
      <SECTION>
        <div>hello</div>
      </SECTION>
    </>
  )
}

export default App