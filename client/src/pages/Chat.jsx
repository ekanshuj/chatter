import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';

import { ChatChannel, ChatList, PreviewChannel } from '../components';
import { io } from 'socket.io-client';
const client = "http://localhost:5000";
// const client = "https://chatter-backend-qu7r.onrender.com";


const SECTION = styled.section`
  max-width: 100vw;
  height: 100vh;
  .channel-container {
    display: grid;
    grid-template-columns: 21rem 1fr;
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const URL = 'http://localhost:5000/api/v1/users';
  // const URL = 'https://chatter-backend-qu7r.onrender.com/api/v1/users';
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
    <SECTION>
      <div className="channel-container">
        <ChatList currentUserData={currentUserData} userDetails={getUserDetails} currentUser={currentUser} />
        {currentUserChat === undefined ? (<PreviewChannel />) : (<ChatChannel currentUserChat={currentUserChat} currentUser={currentUser} socket={socket} />)}
        {/* <ChatChannel /> */}
      </div>
    </SECTION>
  )
}

export default Chat