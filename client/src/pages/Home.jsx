import React from 'react'
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { SocialIcon } from 'react-social-icons';

import love from '../assets/love.svg';

const bounce = keyframes`
 0% {
    top: 0em;
  }
  40% {
    top: 0em;
  }
  43% {
    top: -0.9em;
  }
  46% {
    top: 0em;
  }
  48% {
    top: -0.4em;
  }
  50% {
    top: 0em;
  }
  100% {
    top: 0em;
  }`;

const MAIN = styled.main`
  /* background: black; */
  height: 100vh;
  width: 100vw;
  position: relative;
  `;

const HEADER = styled.header`
  width: 100%;
  background: green;
  height: 12rem;
  div {
  max-width: 65rem;
  margin-inline: auto;
  padding-top: 3rem;
  }
`;

const SECTION = styled.section`
  max-width: 60rem;
  margin-inline: auto;
  height: 35rem;
  background: blue;
  margin-top: -75px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button {
    background: none;
    border: none;
    color: white;
    font-weight: 900;
    font-size: 1.1rem;
    text-decoration: underline;
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
  max-width: 65rem;
  margin-inline: auto;
  padding: 2px 0px;
  .tech {
    font-weight: bold;
  }
`;

const Home = () => {
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
          url="https://github.com/ekanshuj/react-chat-application"
          bgColor='transparent'
          fgColor='black' />
      </FOOTER>
    </MAIN>
  )
}

export default Home