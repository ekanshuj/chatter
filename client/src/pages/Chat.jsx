import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';

import { ChatChannel, ChatList, PreviewChannel } from '../components';
import background from '../assets/background.svg';
import { socials } from '../config/config';

import { io } from 'socket.io-client';
const client = "http://localhost:5000";

const HEADER = styled.header`
  height: 9vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding-inline: 23px;
  background: url(${background});
  color: #badd;
  /* border-bottom: 2px solid #bada55; */
  .brand {
    h1 {
      text-transform: uppercase;
      font-size: 2rem;
      /* color: ghostwhite; */
      float: left;
      padding: 9px;
  }}
  hr {
    width: 90rem;
    height: 3px;
    background: #000000;
  }
  .credits__links {
      float: right;
      display: flex;
      align-items: center;
      justify-content: center;
      .credit__links-icon {
        aspect-ratio: 1;
        width: 41px;
        margin-inline: 5px;
        a {
          filter: invert(100);
  }}}
`;

const SECTION = styled.section`
  height: 91vh;
  width: 100vw;
  .channel-container {
    height: 100%;
    display: grid;
    grid-template-columns: 25rem 1fr;
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const URL = 'http://localhost:5000/api/v1/users';
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserData, setCurrentUserData] = useState(undefined);
  const [currentUserChat, setCurrentUserChat] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)) navigate("/");
      else {
        try {
          setCurrentUser(await JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)));
        } catch (er) {
          console.log(er);
        }
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(client, { transports: ['websocket'] });
      socket.current.emit("user", currentUser._id);
    };
  }, [currentUser])
  useEffect(() => {
    const getData = async () => {
      if (currentUser) {
        try {
          const { data } = await Axios.get(`${URL}/${currentUser._id}`, {
            headers: {
              "Content-Type": "application/json",
              "authToken": currentUser.token
            }
          });
          if (data.status === true) {
            const { users } = data;
            setCurrentUserData(users);
          }
        } catch (er) {
          console.log(er);
        }
      };
    }
    getData();
  }, [currentUser]);

  const getUserDetails = (details) => {
    setCurrentUserChat(details);
  }

  return (
    <>
      <HEADER>
        <div className="brand">
          <h1>prototype-a</h1>
        </div>
        <div className="credits__links">
          {
            socials?.map(({ url, icon }, i) => (
              <div className='credit__links-icon' key={i}>
                <a href={url}>
                  {icon}
                </a>
              </div>
            ))
          }
        </div>
      </HEADER>
      <SECTION>
        <div className="channel-container">
          <ChatList currentUserData={currentUserData} userDetails={getUserDetails} />
          {currentUserChat === undefined ? (<PreviewChannel />) : (<ChatChannel currentUserChat={currentUserChat} currentUser={currentUser} socket={socket} />)}
        </div>
      </SECTION>
    </>
  )
}

export default Chat