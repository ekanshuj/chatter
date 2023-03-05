import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { SocialIcon } from 'react-social-icons';

import love from '../assets/love.svg';

const MAIN = styled.main`
  background: #1C1C25;
  height: 100vh;
  width: 100vw;
  position: relative;
  `;

const HEADER = styled.header`
  width: 100%;
  background: #43729D;
  height: 12rem;
  div {
  max-width: 62rem;
  margin-inline: auto;
  padding-top: 3rem;
  h2 {
    font-size: 1.09rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: bold;
  }}
`;

const SECTION = styled.section`
  max-width: 60rem;
  margin-inline: auto;
  height: 30rem;
  background: #1C1C25;
  margin-top: -75px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid white;
  button {
    background: none;
    border: none;
    color: #ffff;
    font-weight: bold;
    font-size: 1.1rem;
    letter-spacing: 2px;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    cursor: pointer;
  }
`;

const FOOTER = styled.footer`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  max-width: 62rem;
  margin-inline: auto;
  padding: 2px 0px;
  .tech {
    font-weight: bold;
    color: gray;
    letter-spacing: 1px;
    font-size: 0.93rem;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)) navigate("/chat");
  }, []);

  return (
    <MAIN>
      <HEADER>
        <div>
          <h2>Chatter - A Realtime Chat Application</h2>
        </div>
      </HEADER>
      <SECTION>
        <img src={love} />
        <Link to="/signup">
          <button>Get Started</button>
        </Link>
      </SECTION>
      <FOOTER>
        <div>
          <p className='tech'>Mongodb | Express | React.js | Node.js</p>
        </div>
        <SocialIcon
          target='_blank'
          url="https://github.com/ekanshuj/chatter"
          bgColor='transparent'
          fgColor='gray' />
      </FOOTER>
    </MAIN>
  )
}

export default Home