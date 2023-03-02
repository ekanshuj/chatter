import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CgMoreVertical } from 'react-icons/cg';
import Axios from 'axios';

import { ChatChannelInput } from './';


const DIVISION = styled.div`
background: #1F2029;
/* display: flex;
align-items: center;
justify-content: center;
flex-direction: column; */
display: grid;
grid-template-rows: 8.1% 83.9% 8%;
width: 100%;
height: 100vh;
overflow: hidden;
`;

const USER = styled.header`
width: inherit;
background: #1F2029;
color: #D0D3D4;
border-bottom: 1px solid #505055;
padding: 11px 9px;
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
    border: 1px solid rgba(255,255,255,0.5);
    background: #000000;
    color: #CCD1D1;
    border-radius: 0px 0px 4px 4px;
    padding: 11px 7px;
    margin-top: 7px;
    position: absolute;
    right: 0%;
    width: 278px;
    display: flex;
    align-items: center;
    column-gap: 7px;
    p {
      font-size: 1.3rem;
      padding: 3px 0px;
    }
  }
}
`;

const CHATCONTAINER = styled.div`
height: 100%;
width: 100%;
background: #1F2029;

`;

const MESSAGES = styled.section`
width: 100%;
height: inherit;
padding: 9px 0px;
.messages {
  width: 100%;
  height: inherit;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
   ::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
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
      margin: 5px 0px;
      div {
        background: #282A30;
        color: #CCD1D1;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 21px;
        padding-right: 9px;
      }
    }
  .receiver {
      justify-content: flex-start;
      margin: 5px 0px;
      div {
        background: #282A30;
        color: #CCD1D1;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 9px;
        padding-right: 21px;
      }
    }
}
`;

// const ChatChannel = () => {
const ChatChannel = ({ currentUserChat, currentUser, socket }) => {
  const messageRef = useRef();
  const URL1 = 'http://localhost:5000/api/v1/chats/allmsg'
  const URL2 = 'http://localhost:5000/api/v1/chats/newmsg'
  // const URL1 = 'https://chatter-backend-qu7r.onrender.com/api/v1/chats/allmsg'
  // const URL2 = 'https://chatter-backend-qu7r.onrender.com/api/v1/chats/newmsg'
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [activeData, setActiveData] = useState(null);

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
    await socket.current.emit("send__messages", {
      to: currentUserChat._id,
      from: currentUser._id,
      message: text,
    })
    await Axios.post(URL2, {
      from: currentUser._id,
      to: currentUserChat._id,
      message: text
    });
    setUserData(userData => [...userData, { sender: true, message: text }]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive__messages", (data) => {
        setActiveData({ message: data })
      });
    }
  }, [])

  useEffect(() => {
    activeData && setUserData(prev => [...prev, activeData])
  }, [activeData])

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [userData])

  return (
    <DIVISION>
      <USER>
        <div className="user__name">
          {/* <h1>Ekanshu</h1> */}
          <h1>{currentUserChat.name.split(' ').slice(0, 1)}</h1>
        </div>
        <div className="user__info">
          <span onClick={toggleHandle}>
            <CgMoreVertical size={"1.75rem"} />
          </span>
          {
            toggle && (
              <template>
                <p>{currentUserChat.name}</p>
                |
                <p>@{currentUserChat.username}</p>
              </template>
            )
          }
        </div>
      </USER>
      <CHATCONTAINER>
        <MESSAGES>
          <div className="messages">
            {userData?.map((data, i) => {
              return (
                <div ref={messageRef} key={i} className={`message ${data.sender === true ? 'sender' : 'receiver'}`}>
                  <div>{data.message}</div>
                </div>
              )
            })}
            {/* <div>hello</div> */}
          </div>
        </MESSAGES>
      </CHATCONTAINER>
      <ChatChannelInput handleSend={handleSend} />
      {/* <ChatChannelInput /> */}
    </DIVISION>
  )
}


export default ChatChannel

