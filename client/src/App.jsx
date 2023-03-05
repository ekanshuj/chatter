import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Chat = lazy(() => import("./pages/Chat"));

const DIVISION = styled.div`
@media(max-width: 1024px) {
  display: none;
}`;

const SECTION = styled.section`
height: 100vh;
width: 100vw;
display: grid;
grid-template-rows: 92% 8%;
background: #1C1C25;
color: #fff;
font-size: 1.71rem;
padding: 0px 5px;
@media(min-width: 1024px) {
  display: none;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  div {
    text-align: center;
    letter-spacing: 1px;
    strong {
      color: orange;
    }
  }
}
.note {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  span {
    text-align: center;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    strong {
      text-decoration: underline;
      color: red;
      letter-spacing: 2.1px; 
    }
  }
}
`;

const App = () => {
  return (
    <>
      <DIVISION className='app'>
        <Suspense fallback={<span>Loading...</span>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Suspense>
      </DIVISION>
      <SECTION>
        <div className='heading'>
          <div>
            Text on your computer with <strong>Chatter</strong> for web.
          </div>
        </div>
        <div className='note'>
          <span>
            <strong>Note</strong>: Currently only available on laptop devices & above.
          </span>
        </div>
      </SECTION>
    </>
  )
}

export default App