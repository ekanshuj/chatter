import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CgMoreVertical } from 'react-icons/cg';
import Axios from 'axios';

import { ChatChannelInput } from './';


const DIVISION = styled.div`
background: #1F2029;
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
  display: flex;
  align-items: center;
  justify-content: center;
  .user__toggle {
    cursor: pointer;
  }
  template {
    border: 1px solid rgba(255,255,255,0.5);
    background: #000000;
    color: #CCD1D1;
    border-radius: 0px 0px 4px 4px;
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      font-size: 1.3rem;
      padding: 1px 5px;
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
padding: 3px 0px;
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
      margin: 5px 15px;
      font-size: 1.285rem;
      padding: 3px 0px;
      max-width: 500px;
    }
  }
  .sender {
      justify-content: flex-end;
      div {
        background: #282A30;
        color: #CCD1D1;
        padding: 3px 0px;
        padding-left: 21px;
        padding-right: 9px;
        border-right: 3px solid orange;
      }
    }
  .receiver {
      justify-content: flex-start;
      div {
        background: #282A30;
        color: #CCD1D1;
        padding: 3px 0px;
        padding-left: 9px;
        padding-right: 21px;
        border-left: 3px solid orange;
      }
    }
}
`;

const ChatChannel = ({ currentUserChat, currentUser, socket }) => {
  const messageRef = useRef();
  const toggleRef = useRef();
  const URL1 = 'http://localhost:5000/api/v1/chats/allmsg'
  const URL2 = 'http://localhost:5000/api/v1/chats/newmsg'
  // const URL1 = 'https://chatter-backend-qu7r.onrender.com/api/v1/chats/allmsg'
  // const URL2 = 'https://chatter-backend-qu7r.onrender.com/api/v1/chats/newmsg'
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState([]);
  const [activeData, setActiveData] = useState(null);

  const toggleHandle = (e) => {
    setToggle((prev) => !prev);
    (toggle === false) ? toggleRef.current.style.filter = 'invert(1)' : toggleRef.current.style.filter = 'invert(0)';
  };

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
          <h1>{currentUserChat.name.split(' ').slice(0, 1)}</h1>
        </div>
        <div className="user__info">
          {
            (toggle === true) && (
              <template>
                <div>{currentUserChat.name}</div>
                |
                <div>@{currentUserChat.username}</div>
              </template>
            )
          }
          <div className='user__toggle' ref={toggleRef} onClick={toggleHandle}>
            <CgMoreVertical className='user__svg' size={"1.75rem"} />
          </div>
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

