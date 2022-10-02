import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CgMoreVertical } from 'react-icons/cg';
import Axios from 'axios';

import { ChatChannelInput } from './';


const DIVISION = styled.div`
height: 91vh;
width: 100%;
/* background: #000000; */
`;

const USER = styled.header`
background: #ffffff;
box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
-webkit-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
-moz-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
margin-inline: 11px;
padding: 17px 9px;
border-radius: 0px 0px 4px 4px;
/* margin: 0px 2px 5px 2px; */
/* background: #e0e0e0; */
display: flex;
align-items: center;
justify-content: space-between;
.user__info {
  position: relative;
  span {
    cursor: pointer;
  }
  template {
    display: block;
    background: #ffffff;
    box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    -webkit-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    -moz-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    border-radius: 0px 0px 4px 4px;
    padding: 11px 7px;
    margin-top: 7px;
    position: absolute;
    right: 0%;
    width: 278px;
    p {
      font-size: 1.3rem;
      padding: 3px 0px;
    }
  }
}
`;

const MESSAGES = styled.section`
height: 77vh;
width: 100%;
padding: 9px 17px;
.messages {
  width: 100%;
  .message {
    display: flex;
    align-items: center;
    div {
      margin-inline: 5px;
      font-size: 1.45rem;
      padding: 3px 0px;
    }
  }
  .sender {
      justify-content: flex-end;
    }
  .receiver {
      justify-content: flex-start;
    }
}
`;

const ChatChannel = ({ currentUserChat, currentUser }) => {
  const URL1 = 'http://localhost:5000/api/v1/chats/allmsg'
  const URL2 = 'http://localhost:5000/api/v1/chats/newmsg'
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);

  const toggleHandle = () => {
    setToggle((prev) => !prev);
  }

  useEffect(() => {
    const handleReceive = async () => {
      const response = await Axios.post(URL1, {
        from: currentUser._id,
        to: currentUserChat._id,
      });
      const { data: { messages } } = response;
      setUserData(messages);
    };
    handleReceive();
  }, [currentUserChat]);


  const handleSend = async (text) => {
    await Axios.post(URL2, {
      from: currentUser._id,
      to: currentUserChat._id,
      message: text
    });
    setUserData([...userData, { sender: true, message: text }]);
  };

  return (
    <DIVISION>
      <USER>
        <div className="user__name">
          <h1>{currentUserChat.name}</h1>
        </div>
        <div className="user__info">
          <span onClick={toggleHandle}>
            <CgMoreVertical size={"1.75rem"} />
          </span>
          {
            toggle && (
              <template>
                <p>{currentUserChat.name}</p>
                <p>{currentUserChat.username}</p>
                <p>{currentUserChat.number}</p>
              </template>
            )
          }
        </div>
      </USER>
      <MESSAGES>
        <div className="messages">
          {userData?.map((data, i) => {
            return (
              <div className={`message ${data.sender === true ? 'sender' : 'receiver'}`}>
                <div key={i}>{data.message}</div>
              </div>
            )
          })}
        </div>
      </MESSAGES>
      <ChatChannelInput handleSend={handleSend} />
    </DIVISION>
  )
}

export default ChatChannel

