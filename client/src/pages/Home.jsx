import React from 'react'
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import background from '../assets/background.svg';
import undraw from '../assets/undraw.svg';

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

const DIVISION = styled.div`
  background: url(${background});
  color: #badd;
  .container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
    h1 {
      text-transform: uppercase;
      font-size: 4rem;
    }
    .go {
    button {
      border: 1px solid white;
      padding: 0.7rem 1.45rem;
      font-size: 1.75rem;
      line-height: 1.75rem;
      background: transparent;
      cursor: pointer;
      display: inline-block;
      margin: 0 0.3em 0.3em 0;
      color: #bada55;
      text-align: center;
      transition: all 0.2s;
      animation: ${bounce} 5s infinite linear;
      position: relative;
      &:hover {
        letter-spacing: 0.4rem;
        transition-duration: 0.3  s;
        border-width: 3px 1px;
        border-bottom-color: #badd;
        border-top-color: #badd;
      }
    }}}`;

const Home = () => {
  return (
    <DIVISION>
      <div className="container">
        <h1>Chatter</h1>
        <img src={undraw} alt="undraw" />
        <Link to="/signup">
          <div className="go">
            <button>Get Started</button>
          </div>
        </Link>
      </div>
    </DIVISION>
  )
}

export default Home